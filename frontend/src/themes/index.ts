export interface NeumorphicTheme {
  name: string;
  description: string;
  colors: {
    base: string;
    text: string;
    gradientLight: string;
    gradientDark: string;
    shadowLight: string;
    shadowDark: string;
  };
}

export const themes: NeumorphicTheme[] = [
  {
    name: 'morning-light',
    description: '晨光熹微',
    colors: {
      base: '#e0e5ec',
      text: '#2c3e50',
      gradientLight: '#e8edf4',
      gradientDark: '#d8dde4',
      shadowLight: 'rgba(255, 255, 255, 0.7)',
      shadowDark: 'rgba(163, 177, 198, 0.7)'
    }
  },
  {
    name: 'warm-sand',
    description: '暖沙',
    colors: {
      base: '#e8e3d9',
      text: '#463f35',
      gradientLight: '#f0ebe1',
      gradientDark: '#e0dbd1',
      shadowLight: 'rgba(255, 255, 255, 0.7)',
      shadowDark: 'rgba(179, 170, 157, 0.7)'
    }
  },
  {
    name: 'cool-mint',
    description: '薄荷清韵',
    colors: {
      base: '#e3efe8',
      text: '#2d4339',
      gradientLight: '#ebf7f0',
      gradientDark: '#dbe7e0',
      shadowLight: 'rgba(255, 255, 255, 0.7)',
      shadowDark: 'rgba(157, 179, 167, 0.7)'
    }
  },
  {
    name: 'lavender-mist',
    description: '薰衣草雾',
    colors: {
      base: '#e7e4ed',
      text: '#393348',
      gradientLight: '#efecf5',
      gradientDark: '#dfdce5',
      shadowLight: 'rgba(255, 255, 255, 0.7)',
      shadowDark: 'rgba(169, 162, 184, 0.7)'
    }
  }
];
