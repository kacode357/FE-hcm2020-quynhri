// data/stages.ts
export type StageItem = {
  id: string;
  title: string;
  years?: string;
  /** CÁC place xuất hiện ở giai đoạn này (để show marker/sidebar) */
  placeIds: string[];
  /** CÁC chặng (edge) mới thêm ở giai đoạn này (để vẽ route) */
  edges: [string, string][];
  desc?: string;
  /** Lọc event theo giai đoạn: placeId -> danh sách eventIds cần hiển thị ở stage này */
  eventFilter?: Record<string, string[]>;
};

export const STAGES: StageItem[] = [
  {
    id: "pre-1911",
    title: "Trước 1911 - Nền tảng",
    years: "Trước 1911",
    placeIds: ["kimlien"],
    edges: [],
    desc: "Gia đình nhà Nho yêu nước; truyền thống nhân nghĩa - hiếu học - thương dân.",
    eventFilter: { kimlien: ["1890-kimlien"] },
  },
  {
    id: "1911-1920",
    title: "1911-1920 - Đi tìm đường cứu nước",
    years: "1911-1920",
    placeIds: ["nha-rong", "paris"],
    // route: từ quê -> Nhà Rồng -> Paris
    edges: [["kimlien", "nha-rong"], ["nha-rong", "paris"]],
    desc: "Ra đi từ Bến Nhà Rồng; Versailles 1919; Luận cương Lênin, Đại hội Tours 1920.",
    eventFilter: {
      "nha-rong": ["1911-nha-rong"],
      "paris": ["1919-versailles", "1920-lenin-tours"],
    },
  },
  {
    id: "1921-1923",
    title: "1921-1923 - Paris, Le Paria",
    years: "1921-1923",
    placeIds: ["paris"],
    edges: [],
    desc: "Union Intercoloniale; báo Le Paria - báo chí cách mạng.",
    eventFilter: { "paris": ["1921-1923-paris"] },
  },
  {
    id: "1923-1924",
    title: "1923-1924 - Liên Xô",
    years: "1923-1924",
    placeIds: ["moscow"],
    edges: [["paris", "moscow"]],
    desc: "KUTV; Đại hội V QTCS (1924) - bổ sung lý luận Mác-Lênin.",
    eventFilter: { "moscow": ["1923-1924-lien-xo"] },
  },
  {
    id: "1924-1927",
    title: "1924-1927 - Quảng Châu",
    years: "1924-1927",
    placeIds: ["guangzhou"],
    edges: [["moscow", "guangzhou"]],
    desc: "Hội VN CMTN; báo Thanh Niên; “Bản án…”, “Đường Kách mệnh”.",
    eventFilter: { "guangzhou": ["1925-1927-quang-chau"] },
  },
  {
    id: "1928-1930",
    title: "1928-1930 - Hương Cảng, ĐCSVN",
    years: "1928-1930",
    placeIds: ["hongkong"],
    edges: [["guangzhou", "hongkong"]],
    desc: "“Vô sản hóa”; hợp nhất thành ĐCSVN (2/1930).",
    eventFilter: { "hongkong": ["1930-dang-csvn"] },
  },
  {
    id: "1930-1945",
    title: "1930-1945 - Pác Bó, Ba Đình",
    years: "1930-1945",
    placeIds: ["pacbo", "badinh"],
    edges: [["hongkong", "pacbo"], ["pacbo", "badinh"]],
    desc: "Trở về Pác Bó (1941); Việt Minh; Cách mạng Tháng Tám; 2/9/1945.",
    eventFilter: {
      "pacbo": ["1941-pac-bo-viet-minh"],
      "badinh": ["1945-doc-lap"],
    },
  },
  {
    id: "1945-1954",
    title: "1945-1954 - Việt Bắc",
    years: "1945-1954",
    placeIds: ["vietbac"],
    edges: [["badinh", "vietbac"]],
    desc: "Nhà nước của dân-do dân-vì dân; Lời kêu gọi 19/12/1946; “Sửa đổi…”, “Dân vận”.",
    eventFilter: {
      "vietbac": ["1946-loi-keu-goi", "1947-sua-doi-loi-lam-viec", "1949-dan-van"],
    },
  },
  {
    id: "1951-1969",
    title: "1951-1969 - Hà Nội",
    years: "1951-1969",
    placeIds: ["hanoi-5169"],
    edges: [["vietbac", "hanoi-5169"]],
    desc: "Đại hội II (1951); “Đạo đức cách mạng”; “Quét sạch CN cá nhân”; Di chúc (1969).",
    eventFilter: {
      "hanoi-5169": ["1951-dai-hoi-ii", "1958-dao-duc-cm", "1969-quet-sach-cncn", "1969-di-chuc"],
    },
  },
];
