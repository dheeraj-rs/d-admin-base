import { useLanguage } from '@/core/providers/LanguageProvider';
import { AppMenuItem } from '@/core/types/admin-layout';

const translateMenuItem = (
  item: AppMenuItem,
  t: (key: string) => string
): AppMenuItem => {
  const translatedItem = { ...item };

  if (item.label) {
    const translationKey = `menu.${item.label
      .toLowerCase()
      .replace(/\s+/g, '.')}`;
    translatedItem.label = t(translationKey) || item.label;
  }

  if (item.description) {
    const translationKey = `menu.description.${item.label
      ?.toLowerCase()
      .replace(/\s+/g, '.')}`;
    translatedItem.description = t(translationKey) || item.description;
  }

  if (item.items && item.items.length > 0) {
    translatedItem.items = item.items.map((childItem) =>
      translateMenuItem(childItem, t)
    );
  }

  return translatedItem;
};

export const useTranslatedMenuItems = (
  originalItems: AppMenuItem[]
): AppMenuItem[] => {
  const { t } = useLanguage();

  return originalItems.map((item) => translateMenuItem(item, t));
};
