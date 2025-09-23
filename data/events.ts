import { EventItem } from "@/lib/types";

export const EVENTS: EventItem[] = [
  {
    id: "1890-kimlien",
    year: 1890,
    title: "Sinh tại Kim Liên (xứ Nghệ)",
    summary:
      "Sinh ra trong gia đình nhà Nho yêu nước ở làng Sen – Kim Liên/Hoàng Trù; hình thành lòng yêu nước và ý chí cứu nước.",
    location: { name: "Kim Liên, Nghệ An", lat: 18.7, lng: 105.55 },
    details: [
      "Gia đình nhà Nho, truyền thống hiếu học – yêu nước đặt nền tảng đạo đức, nhân ái.",
      "Quê hương xứ Nghệ giàu truyền thống đấu tranh là tiền đề tinh thần cho hệ tư tưởng sau này."
    ],
  },
  {
    id: "1911-nha-rong",
    year: 1911,
    title: "Rời Bến Nhà Rồng (5/6/1911)",
    summary:
      "Quyết định ra đi tìm đường cứu nước, mở đầu hành trình khảo sát thực tiễn cách mạng thế giới.",
    location: { name: "Sài Gòn – Bến Nhà Rồng", lat: 10.766, lng: 106.705 },
    media: [{ type: "image", src: "/media/1911-ship.jpg", alt: "Tàu rời bến" }],
    quotes: [{ text: "Tôi muốn đi ra ngoài, xem nước Pháp và các nước khác xem họ làm như thế nào." }],
    links: [{ label: "Xem trên bản đồ", href: "/map#nha-rong" }],
    details: [
      "Bối cảnh cách mạng Việt Nam bế tắc; quyết không đi lại lối mòn tiền bối.",
      "Hơn 10 năm lao động–học hỏi ở nhiều nước để tìm con đường cứu nước khả thi."
    ],
  },
  {
    id: "1919-versailles",
    year: 1919,
    title: "“Yêu sách của nhân dân An Nam” gửi Hội nghị Versailles",
    summary:
      "Bước đi chính trị đầu tiên của người Việt trên trường quốc tế với bút danh Nguyễn Ái Quốc.",
    location: { name: "Paris, Pháp", lat: 48.8566, lng: 2.3522 },
    details: [
      "Nêu yêu cầu dân chủ cơ bản cho người Việt dưới ách thực dân.",
      "Đưa vấn đề Việt Nam ra diễn đàn quốc tế, khẳng định tư cách chính trị của dân tộc bị trị."
    ],
  },
  {
    id: "1920-lenin-tours",
    year: 1920,
    title: "Luận cương Lênin & Đại hội Tours (7–12/1920)",
    summary:
      "Đọc Luận cương về vấn đề dân tộc và thuộc địa; dự Đại hội Tours, tán thành Quốc tế Cộng sản – bước ngoặt sang lập trường Mác–Lênin.",
    location: { name: "Tours/Paris, Pháp", lat: 47.3941, lng: 0.6848 },
    details: [
      "Nhận ra con đường giải phóng dân tộc phải gắn với cách mạng vô sản.",
      "Tham gia sáng lập Đảng Cộng sản Pháp – từ chủ nghĩa yêu nước chuyển sang lập trường Mác–Lênin."
    ],
  },
  {
    id: "1921-1923-paris",
    year: 1921,
    title: "Paris: Union Intercoloniale, báo Le Paria",
    summary:
      "Mở rộng tầm nhìn quốc tế, từ chủ nghĩa yêu nước sang lập trường quốc tế vô sản.",
    location: { name: "Paris, Pháp", lat: 48.8566, lng: 2.3522 },
    details: [
      "Cùng các chiến sĩ thuộc địa lập Liên hiệp Thuộc địa; tuyên truyền qua báo Le Paria.",
      "Tư duy chuyển từ giải phóng một dân tộc sang liên kết phong trào thuộc địa toàn cầu."
    ],
  },
  {
    id: "1923-1924-lien-xo",
    year: 1923,
    title: "Liên Xô: Trường Phương Đông, QTCS V (1924)",
    summary:
      "Bổ sung và củng cố nền tảng lý luận Mác–Lênin; dự, phát biểu tại Đại hội V Quốc tế Cộng sản.",
    location: { name: "Moscow, Liên Xô", lat: 55.7558, lng: 37.6173 },
    details: [
      "Học tập về chiến lược–sách lược cách mạng thuộc địa.",
      "Khẳng định vai trò cách mạng thuộc địa trong cách mạng thế giới."
    ],
  },
  {
    id: "1925-1927-quang-chau",
    year: 1925,
    title: "Quảng Châu: Hội VN Cách mạng Thanh niên; “Bản án…”, “Đường Kách mệnh”",
    summary:
      "Tổ chức lực lượng, mở lớp huấn luyện; xuất bản các tác phẩm nền tảng cho đường lối cách mạng VN.",
    location: { name: "Quảng Châu, Trung Quốc", lat: 23.1291, lng: 113.2644 },
    details: [
      "Chủ trương: độc lập dân tộc gắn CNXH; cách mạng là sự nghiệp của quần chúng; cần Đảng kiểu mới lãnh đạo.",
      "“Bản án chế độ thực dân Pháp” (1925) vạch trần tội ác; “Đường Kách mệnh” (1927) tổng kết lý luận–thực tiễn."
    ],
  },
  {
    id: "1930-dang-csvn",
    year: 1930,
    title: "Hợp nhất thành Đảng Cộng sản Việt Nam (2/1930)",
    summary:
      "Tại Hương Cảng, hợp nhất các tổ chức cộng sản; khởi thảo Chánh cương & Sách lược vắn tắt.",
    location: { name: "Hương Cảng (Hong Kong)", lat: 22.3193, lng: 114.1694 },
    details: [
      "Xác lập chiến lược: độc lập dân tộc gắn với CNXH; liên minh công–nông; mặt trận dân tộc thống nhất.",
      "Đặt nền tảng tổ chức lãnh đạo cách mạng VN."
    ],
  },
  {
    id: "1941-pac-bo-viet-minh",
    year: 1941,
    title: "Về nước (28/1/1941), Pác Bó – thành lập Việt Minh (19/5/1941)",
    summary:
      "Xây dựng căn cứ, trực tiếp lãnh đạo; phát triển mặt trận dân tộc thống nhất.",
    location: { name: "Pác Bó, Cao Bằng", lat: 22.85, lng: 106.35 },
    details: [
      "Chủ trương đại đoàn kết toàn dân; đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.",
      "Việt Minh ra đời – kết tinh sức mạnh quần chúng chuẩn bị tổng khởi nghĩa."
    ],
  },
  {
    id: "1945-doc-lap",
    year: 1945,
    title: "Tổng khởi nghĩa – Tuyên ngôn Độc lập (2/9/1945)",
    summary:
      "Hiện thực hóa chân lý: “Độc lập cho dân tộc, tự do – hạnh phúc cho nhân dân”.",
    location: { name: "Quảng trường Ba Đình, Hà Nội", lat: 21.034, lng: 105.837 },
    details: [
      "Khởi nghĩa tháng Tám thành công; Nhà nước dân chủ nhân dân ra đời.",
      "Khởi thảo mô hình nhà nước của dân, do dân, vì dân – đặt nền cho tư tưởng nhà nước và chiến tranh nhân dân sau này."
    ],
  },
];
