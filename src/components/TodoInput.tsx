import { useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { usePressAnimation } from '../hooks/usePressAnimation';
import { colors, radius, spacing } from '../theme';

type TodoInputProps = {
  /** Vrací true, pokud se úkol podařilo přidat. */
  onSubmit: (title: string) => boolean;
};

/** Pole pro napsání nového úkolu + tlačítko Přidat. */
export function TodoInput({ onSubmit }: TodoInputProps) {
  const [value, setValue] = useState('');
  const isEmpty = value.trim().length === 0;

  // Když je pole prázdné, tlačítko je neaktivní a nemá co ztmavnout.
  const addButton = usePressAnimation(
    isEmpty ? colors.primarySoft : colors.primary,
    colors.primaryPressed
  );

  function handleAdd() {
    // Kdyby byl vstup prázdný, nic se nestane.
    if (onSubmit(value)) {
      setValue('');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={handleAdd}
        placeholder="Co je potřeba udělat?"
        placeholderTextColor={colors.placeholder}
        returnKeyType="done"
        maxLength={200}
        accessibilityLabel="Nový úkol"
      />

      <Animated.View
        style={[styles.addButton, { backgroundColor: addButton.backgroundColor }]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Přidat úkol"
          accessibilityState={{ disabled: isEmpty }}
          disabled={isEmpty}
          onPress={handleAdd}
          onPressIn={addButton.pressIn}
          onPressOut={addButton.pressOut}
          style={styles.addButtonTap}
        >
          <Text style={styles.addButtonLabel}>Přidat</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    marginBottom: spacing.lg,
  },
  input: {
    flex: 1,
    // bez toho se vstup na úzkých obrazovkách nenechá zmenšit
    // a tlačítko „Přidat“ přeteče mimo řádek
    minWidth: 0,
    color: colors.text,
    fontSize: 16,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  addButton: {
    borderRadius: radius.md,
    marginLeft: spacing.sm,
  },
  addButtonTap: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  addButtonLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});