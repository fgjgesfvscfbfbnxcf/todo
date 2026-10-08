import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { usePressAnimation } from '../hooks/usePressAnimation';
import { colors, radius, spacing } from '../theme';
import type { Todo } from '../types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

/**
 * Jeden řádek seznamu: zaškrtávací políčko, text a tlačítko pro smazání.
 *
 * Přepnout hotovo / nedokončeno jde kliknutím kamkoliv na řádek, nejen na text
 * nebo na políčko – celý řádek je jedno velké tlačítko. Tlačítko pro smazání
 * je uvnitř, takže po něm kliknout smaže úkol a nic nepřepne.
 *
 * `Animated.View` nese jen barvu pozadí (která se plynule mění při stisku),
 * samotné `Pressable` uvnitř zajišťuje dotyky.
 */
export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const baseColor = todo.done ? colors.cardDone : colors.card;

  const row = usePressAnimation(baseColor, colors.primarySoft);
  const del = usePressAnimation('rgba(0, 0, 0, 0)', colors.dangerSoft);

  return (
    <Animated.View style={[styles.row, { backgroundColor: row.backgroundColor }]}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: todo.done }}
        aria-checked={todo.done}
        accessibilityLabel={`Označit úkol "${todo.title}" jako ${
          todo.done ? 'nedokončený' : 'dokončený'
        }`}
        onPress={() => onToggle(todo.id)}
        onPressIn={row.pressIn}
        onPressOut={row.pressOut}
        style={styles.rowTap}
      >
        <View style={[styles.checkbox, todo.done && styles.checkboxChecked]}>
          {todo.done ? <Text style={styles.checkboxMark}>✓</Text> : null}
        </View>

        <Text
          style={[styles.title, todo.done && styles.titleDone]}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {todo.title}
        </Text>

        <Animated.View style={[styles.deleteCircle, { backgroundColor: del.backgroundColor }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Smazat úkol "${todo.title}"`}
            hitSlop={12}
            onPress={() => onDelete(todo.id)}
            onPressIn={del.pressIn}
            onPressOut={del.pressOut}
            style={styles.deleteTap}
          >
            <Text style={styles.deleteIcon}>✕</Text>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  rowTap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkboxMark: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 20,
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
    paddingRight: spacing.sm,
  },
  titleDone: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  deleteCircle: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
  },
  deleteTap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
});