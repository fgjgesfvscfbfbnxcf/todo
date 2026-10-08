import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme';
import type { Todo } from '../types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

/** Jeden řádek seznamu: zaškrtávací políčko, text a tlačítko pro smazání. */
export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <View style={[styles.row, todo.done && styles.rowDone]}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: todo.done }}
        aria-checked={todo.done}
        accessibilityLabel={`Označit úkol "${todo.title}" jako ${
          todo.done ? 'nedokončený' : 'dokončený'
        }`}
        hitSlop={10}
        onPress={() => onToggle(todo.id)}
        style={({ pressed }) => [
          styles.checkbox,
          todo.done && styles.checkboxChecked,
          pressed && styles.checkboxPressed,
        ]}
      >
        {todo.done ? <Text style={styles.checkboxMark}>✓</Text> : null}
      </Pressable>

      <Pressable style={styles.titleArea} onPress={() => onToggle(todo.id)}>
        <Text
          style={[styles.title, todo.done && styles.titleDone]}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {todo.title}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Smazat úkol "${todo.title}"`}
        hitSlop={10}
        onPress={() => onDelete(todo.id)}
        style={({ pressed }) => [styles.deleteButton, pressed && styles.deleteButtonPressed]}
      >
        <Text style={styles.deleteIcon}>✕</Text>
      </Pressable>
    </View>
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
  checkboxPressed: {
    opacity: 0.6,
  },
  checkboxMark: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 20,
  },
  titleArea: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
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