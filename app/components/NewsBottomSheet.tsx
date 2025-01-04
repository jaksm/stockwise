import {X} from 'lucide-react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {useGetNewsQuery} from '../api/queries';
import {BottomSheetProps} from '../hooks/useBottomSheet';
import {useTheme} from '../hooks/useTheme';
import {Asset} from '../models/Asset';
import {ArticleList} from './ArticleList';
import {Flex} from './ui/Flex';
import {IconButton} from './ui/IconButton';
import {Subheading, Title} from './ui/typography';

type NewsBottomSheetProps = BottomSheetProps & {
  assets?: Asset[];
};

export function NewsBottomSheet({
  isVisible,
  assets = [],
  onClose,
}: NewsBottomSheetProps) {
  const theme = useTheme();

  const symbols = assets.map(asset => asset.symbol);
  const articlesQuery = useGetNewsQuery(symbols);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      marginTop: 'auto',
      margin: 0,
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      style={styles.container}
      swipeDirection="down"
      backdropOpacity={0.7}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
      useNativeDriverForBackdrop
      propagateSwipe>
      <Flex padding="10" paddingHorizontal="2" flex={1}>
        <Flex direction="row" justify="space-between">
          <Flex paddingBottom="4">
            <Title>Business News</Title>
            <Subheading>Aggregated from various sources</Subheading>
          </Flex>

          <IconButton icon={<X />} onPress={onClose} />
        </Flex>

        <ArticleList
          assets={assets}
          articles={articlesQuery.data?.flat()}
          isLoading={articlesQuery.isLoading}
          isRefreshing={articlesQuery.isRefetching}
          onRefresh={articlesQuery.refetch}
        />
      </Flex>
    </Modal>
  );
}
