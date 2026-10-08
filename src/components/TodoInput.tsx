import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, radius, spacing } from '../theme';

type TodoInputProps = {
  /** Vrací true, pokud se úkol podařilo přidat. */
  onSubmit: (title: string) => boolean;
};

/** Pole pro napsání nového úkolu + tlačítko Přidat. */
export function TodoInput({ onSubmit }: TodoInputProps) {
  const [value, setValue] = useState('');

  const isEmpty = value.trim().length === 0;

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

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Přidat úkol"
        accessibilityState={{ disabled: isEmpty }}
        disabled={isEmpty}
        onPress={handleAdd}
        style={({ pressed }) => [
          styles.addButton,
          isEmpty && styles.addButtonDisabled,
          pressed && !isEmpty && styles.addButtonPressed,
        ]}
      >
        <Text style={styles.addButtonLabel}>Přidat</Text>
      </Pressable>
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
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginLeft: spacing.sm,
  },
  addButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  addButtonDisabled: {
    backgroundColor: colors.primarySoft,
  },
  addButtonLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});