import { View } from 'react-native';
import { MediaList } from '../../components/MediaList';

export default function HomeScreen() {
  return (
    <View>
      <MediaList type="movie" category="popular" />
      <MediaList type="tv" category="popular" />
    </View>
  );
}