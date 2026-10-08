import { useMemo } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { TodoInput } from './src/components/TodoInput';
import { TodoItem } from './src/components/TodoItem';
import { useTodos } from './src/hooks/useTodos';
import { colors, radius, spacing } from './src/theme';
import type { Todo } from './src/types';

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();

  const doneCount = useMemo(() => todos.filter((todo) => todo.done).length, [todos]);
  const remaining = todos.length - doneCount;

  function renderItem({ item }: { item: Todo }) {
    return <TodoItem todo={item} onToggle={toggleTodo} onDelete={deleteTodo} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <FlatList
            style={styles.flex}
            contentContainerStyle={styles.listContent}
            data={todos}
            keyExtractor={(todo) => todo.id}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
              <View>
                <Text style={styles.title}>Moje úkoly</Text>
                <Text style={styles.subtitle}>
                  {todos.length === 0
                    ? 'Zatím je tu prázdno – přidej první úkol.'
                    : remaining === 0
                      ? 'Všechno hotovo. Jsi skvělý!'
                      : `Zbývá ${remaining} ${remaining === 1 ? 'úkol' : 'úkolů'}.`}
                </Text>

                <TodoInput onSubmit={addTodo} />
              </View>
            }
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={styles.emptyEmoji}>🗒️</Text>
                <Text style={styles.emptyTitle}>Seznam je prázdný</Text>
                <Text style={styles.emptyText}>
                  Napiš úkol do pole nahoře a stiskni Přidat.
                </Text>
              </View>
            }
            ListFooterComponent={
              doneCount > 0 ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Smazat všechny dokončené úkoly"
                  onPress={clearCompleted}
                  style={({ pressed }) => [styles.clearButton, pressed && styles.clearButtonPressed]}
                >
                  <Text style={styles.clearButtonLabel}>
                    Smazat dokončené ({doneCount})
                  </Text>
                </Pressable>
              ) : null
            }
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxl,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  clearButton: {
    alignSelf: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.danger,
    marginTop: spacing.sm,
  },
  clearButtonPressed: {
    backgroundColor: colors.dangerSoft,
  },
  clearButtonLabel: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '700',
  },
});