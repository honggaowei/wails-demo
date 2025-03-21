// 定义主题枚举类型
export const THEME_ENUM = {
  morningLight: 'morning-light',
  warmSand: 'warm-sand',
  coolMint: 'cool-mint',
  lavenderMist: 'lavender-mist',
} as const;

export const THEME_TEXT_ENUM = {
  morningLight: '晨风',
  warmSand: '暖沙',
  coolMint: '薄荷清韵',
  lavenderMist: '薰衣草雾',
} as const;

// 定义类型
export type ThemeKey = keyof typeof THEME_ENUM;
export type ThemeTextKey = keyof typeof THEME_TEXT_ENUM;

// 默认主题
export function getDefaultTheme(): ThemeKey {
  return 'morningLight'; // 默认返回 morningLight
}

// 获取主题文字
export const getThemeText = (theme: ThemeKey): string => {
  return THEME_TEXT_ENUM[theme] || '不支持主题';
};

// 切换主题
export const setDocumentTheme = (theme: ThemeKey): void => {
  if (!THEME_ENUM.hasOwnProperty(theme)) return;
  document.documentElement.setAttribute('data-theme', THEME_ENUM[theme]);
};

// 获取主题列表
export const getThemeList = (): ThemeKey[] => {
  return Object.keys(THEME_ENUM) as ThemeKey[];
};