import type{ Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'rma-home-2024',
    name: 'Real Madrid Home Jersey 24/25',
    team: 'Real Madrid',
    price: 90.00,
    image: '/images/real_madrid_home.webp',
    description: 'Official Real Madrid home jersey for the 2024/25 season. Features AEROREADY technology, classic white design with elegant black and gold accents. Made with recycled materials.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isFeatured: true,
  },
  {
    id: 'manutd-away-2024',
    name: 'Man Utd Away Jersey 24/25',
    team: 'Manchester United',
    price: 85.00,
    image: '/images/man_united_away.avif',
    description: 'Official Manchester United away jersey for the 2024/25 season. Lightweight and breathable, designed for peak performance. Bold new color scheme.',
    sizes: ['S', 'M', 'L', 'XL'],
    isFeatured: true,
  },
  {
    id: 'barca-training-kit',
    name: 'FC Barcelona Training Kit',
    team: 'FC Barcelona',
    price: 60.00,
    image: '/images/barcelona_training.webp',
    description: 'FC Barcelona training kit, perfect for your workout sessions or casual wear. Stay cool and comfortable while showing your support.',
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: 'liverpool-third-2024',
    name: 'Liverpool FC Third Kit 24/25',
    team: 'Liverpool FC',
    price: 88.00,
    image: '/images/liverpool_third.jpg',
    description: 'Liverpool FC\'s striking third kit for the upcoming season. Unique design with advanced moisture-wicking fabric.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isFeatured: true,
  },
  {
    id: 'bayern-home-2024',
    name: 'Bayern Munich Home Jersey 24/25',
    team: 'Bayern Munich',
    price: 92.00,
    image: '/images/bayern_home.jpg', // Add this image
    description: 'Classic red Bayern Munich home jersey. Embrace the spirit of the Bavarian giants.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'psg-home-2024',
    name: 'PSG Home Jersey 24/25',
    team: 'Paris Saint-Germain',
    price: 95.00,
    image: '/images/psg_home.jpg', // Add this image
    description: 'Official PSG home jersey. Represent your favorite Parisian club with style.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'arsenal-away-2024',
    name: 'Arsenal Away Jersey 24/25',
    team: 'Arsenal',
    price: 87.00,
    image: '/images/arsenal_away.jpg', // Add this image
    description: 'New Arsenal away kit. Designed for the gunners, featuring a modern look.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'juventus-home-2024',
    name: 'Juventus Home Jersey 24/25',
    team: 'Juventus',
    price: 89.00,
    image: '/images/juventus_home.jpg', // Add this image
    description: 'The iconic black and white stripes of Juventus. Show your allegiance to the Old Lady.',
    sizes: ['S', 'M', 'L'],
  },
  // Add more products as desired
];