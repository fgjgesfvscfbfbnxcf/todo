import { useCallback, useEffect, useRef } from 'react';
import { Animated, Platform } from 'react-native';

/**
 * Doby stisku. Výchozí `Pressable` přepíná barvu okamžitě, což působí trhaně –
 * tady barva pozvolně přejíšdí a po puštění ještě chvíli dojíždí zpět.
 */
const PRESS_IN_DURATION = 160;
const PRESS_OUT_DURATION = 600;

/** Plynulé zklidnění na začátku i na konci přechodu. */
function easeOut(t: number): number {
  return 1 - (1 - t) ** 3;
}

/**
 * Plynulé zbarvení pozadí při stisku (Android a iOS).
 *
 * Na webu má vlastní `Animated.timing` omezení a přechod se řeší CSS
 * transitionem, který se aplikuje v `webScrollbar.ts` – proto se tam tween
 * nespouští a barvu zajišťuje prohlížeč.
 *
 * @param from barva, když nic nemačkáme
 * @param to barva během stisku
 */
export function usePressAnimation(from: string, to: string) {
  const amount = useRef(new Animated.Value(0)).current;
  const progress = useRef(0);
  const frame = useRef<number | null>(null);

  /**
   * Přechod počítáme ručně přes `requestAnimationFrame` a průběžně zapisujeme do
   * `Animated.Value`. Používáme `setValue`, protože na webu `Animated.timing`
   * hodnotu nerozpohybuje – tady funguje stejně na Androidu i iOS.
   */
  const run = useCallback(
    (target: number, duration: number) => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
      }

      const fromValue = progress.current;
      const startedAt = Date.now();

      const step = () => {
        const elapsed = duration <= 0 ? 1 : Math.min(1, (Date.now() - startedAt) / duration);

        progress.current = fromValue + (target - fromValue) * easeOut(elapsed);
        amount.setValue(progress.current);

        frame.current = elapsed < 1 ? requestAnimationFrame(step) : null;
      };

      frame.current = requestAnimationFrame(step);
    },
    [amount]
  );

  // nenecháme animaci běžet po zrušení komponenty
  useEffect(
    () => () => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
      }
    },
    []
  );

  const pressIn = useCallback(() => {
    if (Platform.OS !== 'web') {
      run(1, PRESS_IN_DURATION);
    }
  }, [run]);

  const pressOut = useCallback(() => {
    if (Platform.OS !== 'web') {
      run(0, PRESS_OUT_DURATION);
    }
  }, [run]);

  const backgroundColor = amount.interpolate({
    inputRange: [0, 1],
    outputRange: [from, to],
  });

  return { backgroundColor, pressIn, pressOut };
}