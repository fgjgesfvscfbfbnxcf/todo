import { Pressable, StyleSheet, Text, View } from 'react-native';

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
 */
export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: todo.done }}
      aria-checked={todo.done}
      accessibilityLabel={`Označit úkol "${todo.title}" jako ${
        todo.done ? 'nedokončený' : 'dokončený'
      }`}
      onPress={() => onToggle(todo.id)}
      style={({ pressed }) => [
        styles.row,
        todo.done && styles.rowDone,
        pressed && styles.rowPressed,
      ]}
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

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Smazat úkol "${todo.title}"`}
        hitSlop={12}
        onPress={() => onDelete(todo.id)}
        style={({ pressed }) => [styles.deleteButton, pressed && styles.deleteButtonPressed]}
      >
        <Text style={styles.deleteIcon}>✕</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  rowDone: {
    backgroundColor: colors.cardDone,
    borderColor: colors.border,
  },
  rowPressed: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
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
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonPressed: {
    backgroundColor: colors.dangerSoft,
  },
  deleteIcon: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
});