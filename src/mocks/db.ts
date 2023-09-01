export interface Location {
  id: number;
  name: string;
  robot: {
    id: string;
    is_online: boolean;
  };
}

export const locations: Location[] = [
  {
    id: 1,
    name: "names",
    robot: {
      id: "abcde123",
      is_online: false,
    },
  },
  {
    id: 2,
    name: "ABCDEF",
    robot: {
      id: "Pennybot-123456",
      is_online: true,
    },
  },
  {
    id: 3,
    name: "!@#$%^&*",
    robot: {
      id: "Pennybot-123456",
      is_online: true,
    },
  },
  {
    id: 4,
    name: "맛있는 식당",
    robot: {
      id: "Pennybot-123456",
      is_online: false,
    },
  },
  {
    id: 5,
    name: "넓은 치과",
    robot: {
      id: "Pennybot-123456",
      is_online: true,
    },
  },
  {
    id: 6,
    name: "괜찮은 레스토랑",
    robot: {
      id: "Pennybot-123456",
      is_online: false,
    },
  },
  {
    id: 7,
    name: "꽤나 넓은 병원",
    robot: {
      id: "Pennybot-123456",
      is_online: false,
    },
  },
  {
    id: 8,
    name: "고기 구워주는 고기집",
    robot: {
      id: "Pennybot-123456",
      is_online: false,
    },
  },
  {
    id: 9,
    name: "베어로보틱스",
    robot: {
      id: "Pennybot-123456",
      is_online: false,
    },
  },
  {
    id: 10,
    name: "GHIJKLMNOP",
    robot: {
      id: "Pennybot-123456",
      is_online: false,
    },
  },
  {
    id: 11,
    name: "Spicy restaurant",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
  {
    id: 12,
    name: "Salty restaurant",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
];
