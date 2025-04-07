import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomePage from './src/components/pages/HomePage';

export default function App() {
  return (
    <View style={styles.container}>
      <HomePage />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
