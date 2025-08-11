// src/data/products.ts
import type { Product } from './product'; // Ensure this import points to your product.ts

export const products: Product[] = [
  {
    id: 'rma-home-2024',
    name: 'Real Madrid Home Jersey 24/25',
    team: 'Real Madrid',
    price: 90.00,
    image: '/images/real_madrid_home.webp', // Placeholder, ensure image exists
    description: 'Official Real Madrid home jersey for the 2024/25 season. Features AEROREADY technology, classic white design with elegant black and gold accents. Made with recycled materials.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isFeatured: true,
    type: 'club', // Categorized as club
  },
  {
    id: 'manutd-away-2024',
    name: 'Man Utd Away Jersey 24/25',
    team: 'Manchester United',
    price: 85.00,
    image: '/images/man_united_away.avif', // Placeholder, ensure image exists
    description: 'Official Manchester United away jersey for the 2024/25 season. Lightweight and breathable, designed for peak performance. Bold new color scheme.',
    sizes: ['S', 'M', 'L', 'XL'],
    isFeatured: true,
    type: 'club', // Categorized as club
  },
  {
    id: 'barca-training-kit',
    name: 'FC Barcelona Training Kit',
    team: 'FC Barcelona',
    price: 60.00,
    image: '/images/barcelona_training.webp', // Placeholder, ensure image exists
    description: 'FC Barcelona training kit, perfect for your workout sessions or casual wear. Stay cool and comfortable while showing your support.',
    sizes: ['M', 'L', 'XL'],
    type: 'training', // Categorized as training kit
  },
  {
    id: 'liverpool-third-2024',
    name: 'Liverpool FC Third Kit 24/25',
    team: 'Liverpool FC',
    price: 88.00,
    image: '/images/liverpool_third.jpg', // Placeholder, ensure image exists
    description: 'Liverpool FC\'s striking third kit for the upcoming season. Unique design with advanced moisture-wicking fabric.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isFeatured: true,
    type: 'club', // Categorized as club
  },
  {
    id: 'bayern-home-2024',
    name: 'Bayern Munich Home Jersey 24/25',
    team: 'Bayern Munich',
    price: 92.00,
    image: '/images/bayern_home.jpg', // Placeholder, ensure image exists
    description: 'Classic red Bayern Munich home jersey. Embrace the spirit of the Bavarian giants.',
    sizes: ['S', 'M', 'L', 'XL'],
    type: 'club', // Categorized as club
  },
  {
    id: 'psg-home-2024',
    name: 'PSG Home Jersey 24/25',
    team: 'Paris Saint-Germain',
    price: 95.00,
    image: '/images/psg_home.jpg', // Placeholder, ensure image exists
    description: 'Official PSG home jersey. Represent your favorite Parisian club with style.',
    sizes: ['S', 'M', 'L', 'XL'],
    type: 'club', // Categorized as club
  },
  {
    id: 'arsenal-away-2024',
    name: 'Arsenal Away Jersey 24/25',
    team: 'Arsenal',
    price: 87.00,
    image: '/images/arsenal_away.jpg', // Placeholder, ensure image exists
    description: 'New Arsenal away kit. Designed for the gunners, featuring a modern look.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    type: 'club', // Categorized as club
  },
  {
    id: 'juventus-home-2024',
    name: 'Juventus Home Jersey 24/25',
    team: 'Juventus',
    price: 89.00,
    image: '/images/juventus_home.jpg', // Placeholder, ensure image exists
    description: 'The iconic black and white stripes of Juventus. Show your allegiance to the Old Lady.',
    sizes: ['S', 'M', 'L'],
    type: 'club', // Categorized as club
  },
  // --- New products for specific categories ---
  {
    id: 'argentina-home-2022-messi',
    name: 'Argentina Home Jersey 2022 (Messi)',
    team: 'Argentina National Team',
    price: 100.00,
    image: '/images/argentina_home_messi.webp', // Placeholder, ensure image exists
    description: 'Official Argentina home jersey from the 2022 World Cup, featuring Messi\'s name and number.',
    sizes: ['S', 'M', 'L', 'XL'],
    isFeatured: true,
    type: 'player', // Categorized as player-based
    country: 'Argentina', // Also provides country context
    player: 'Messi',
  },
  {
    id: 'brazil-away-2022-neymar',
    name: 'Brazil Away Jersey 2022 (Neymar)',
    team: 'Brazil National Team',
    price: 98.00,
    image: '/images/brazil_away_neymar.webp', // Placeholder, ensure image exists
    description: 'Brazil away jersey from the 2022 season, with Neymar\'s name and number.',
    sizes: ['M', 'L', 'XL'],
    type: 'player', // Categorized as player-based
    country: 'Brazil', // Also provides country context
    player: 'Neymar Jr.',
  },
  {
    id: 'england-home-1998',
    name: 'England Home Jersey 1998 (Retro)',
    team: 'England National Team',
    price: 120.00,
    image: '/images/england_home_1998_retro.webp', // Placeholder, ensure image exists
    description: 'Classic England home jersey from the 1998 World Cup. A true retro gem.',
    sizes: ['M', 'L', 'XL'],
    type: 'retro', // Categorized as retro
    country: 'England',
    year: 1998,
  },
  {
    id: 'germany-home-1990',
    name: 'West Germany Home Jersey 1990 (Retro)',
    team: 'West Germany National Team',
    price: 130.00,
    image: '/images/germany_home_1990_retro.webp', // Placeholder, ensure image exists
    description: 'Iconic West Germany home jersey from their 1990 World Cup victory.',
    sizes: ['L', 'XL'],
    isFeatured: true,
    type: 'retro', // Categorized as retro
    country: 'Germany',
    year: 1990,
  },
  {
    id: 'spain-home-2024',
    name: 'Spain Home Jersey 24/25',
    team: 'Spain National Team',
    price: 90.00,
    image: '/images/spain_home.webp', // Placeholder, ensure image exists
    description: 'Official Spain home jersey for the 2024/25 season.',
    sizes: ['S', 'M', 'L', 'XL'],
    type: 'country', // Categorized as country-based
    country: 'Spain',
  },
  {
    id: 'italy-away-2024',
    name: 'Italy Away Jersey 24/25',
    team: 'Italy National Team',
    price: 88.00,
    image: '/images/italy_away.webp', // Placeholder, ensure image exists
    description: 'New Italy away jersey for the upcoming season.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    type: 'country', // Categorized as country-based
    country: 'Italy',
  },
];
