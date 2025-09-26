// data/events.ts
import { EventItem } from "@/lib/types";

export const EVENTS: EventItem[] = [
  // I. Trước 1911 - Nền tảng: gia đình, quê hương, truyền thống dân tộc
  {
    id: "1890-kimlien",
    year: 1890,
    title: "Sinh tại Kim Liên (xứ Nghệ)",
    summary:
      "Sinh ra trong gia đình nhà Nho yêu nước ở làng Sen - Kim Liên/Hoàng Trù; thấm nhuần truyền thống nhân nghĩa, hiếu học, thương dân - nền tảng đạo đức và lòng yêu nước.",
    location: { name: "Kim Liên, Nghệ An", lat: 18.7, lng: 105.55 },
    details: [
      "Bác sinh ra và lớn lên tại làng Sen - Kim Liên/Hoàng Trù, trong một gia đình nhà Nho yêu nước, thấm nhuần truyền thống nhân nghĩa, hiếu học, thương dân.",
      "Từ đó, Người hình thành lòng yêu nước mãnh liệt, ý chí cứu nước, cứu dân, tạo nên tiền đề tinh thần cho toàn bộ tư tưởng sau này.",
      "Gợi nền tảng văn hóa - gia đình, nơi ươm mầm lòng yêu nước của Bác."
    ],
    // ảnh local trong thư mục /public
    media: [
      { type: "image", src: "/1_pic_1.png", alt: "Làng Sen - Kim Liên, quê Bác" }
    ],
    // link mày đưa
    links: [
      { label: "Làng Sen, quê Bác (reviewvilla.vn)", href: "https://reviewvilla.vn/lang-sen-que-bac/" }
    ],
  },

  // II. 1911-1920 - “Bác đi tìm đường cứu nước” → Bước ngoặt đến với chủ nghĩa Mác-Lênin
{
  id: "1911-nha-rong",
  year: 1911,
  title: "Rời Bến Nhà Rồng (5/6/1911)",
  summary:
    "Quyết định ra đi tìm đường cứu nước; gần 10 năm bôn ba, lao động - viết báo - khảo sát thực tiễn tư bản và thuộc địa.",
  location: { name: "Sài Gòn - Bến Nhà Rồng", lat: 10.766, lng: 106.705 },
  media: [
    // ảnh local trong /public
    { type: "image", src: "/2_pic_1_bennharong.png", alt: "Bến Nhà Rồng (5/6/1911)" },
    // ảnh ngoài (Báo Ấp Bắc)
  ],
  quotes: [
    { text: "Tôi muốn đi ra ngoài, xem nước Pháp và các nước khác xem họ làm như thế nào." }
  ],
  details: [
    "Cuối thế kỷ XIX, đầu thế kỷ XX, phong trào cách mạng Việt Nam tuy sôi nổi nhưng bế tắc về đường lối và tổ chức.",
    "Người khâm phục các bậc tiền bối như Phan Đình Phùng, Phan Bội Châu, Phan Chu Trinh, Hoàng Hoa Thám, nhưng không đi theo con đường của họ.",
    "Sau khi khảo sát, Người nhận thấy cách mạng tư sản tuy vĩ đại nhưng không triệt để; dân chúng vẫn khổ, bị áp bức, bóc lột. Từ đó đi đến kết luận: không thể đi theo con đường ấy."
  ],
  links: [
    { label: "Xem trên bản đồ", href: "/map#nha-rong" },
    { label: "Ảnh: Báo Ấp Bắc", href: "https://www.baoapbac.vn/dataimages/202406/original/images1949896_T4_1.jpg" }
  ],
},
{
  id: "1919-versailles",
  year: 1919,
  title: "“Yêu sách của nhân dân An Nam” tại Versailles",
  summary:
    "Thay mặt Nhóm người Việt yêu nước tại Pháp, ký tên Nguyễn Ái Quốc gửi yêu sách tới Hội nghị Versailles - bước hiện diện chính trị đầu tiên của người Việt trên diễn đàn quốc tế.",
  location: { name: "Paris, Pháp", lat: 48.8566, lng: 2.3522 },
  details: [
    "Dù không được chấp nhận, bản yêu sách nêu các quyền dân chủ cơ bản cho người Việt dưới ách thực dân.",
    "Khẳng định tư cách chính trị của dân tộc bị trị trước quốc tế."
  ],
  // nếu có ảnh sau này, chỉ cần thêm vào mảng media như trên
},
{
  id: "1920-lenin-tours",
  year: 1920,
  title: "Luận cương Lênin & Đại hội Tours (7-12/1920)",
  summary:
    "Đọc Luận cương của Lênin về vấn đề dân tộc và thuộc địa; tại Đại hội Tours (12/1920), bỏ phiếu theo Quốc tế III và tham gia sáng lập Đảng Cộng sản Pháp - bước ngoặt sang lập trường Mác-Lênin.",
  location: { name: "Tours/Paris, Pháp", lat: 47.3941, lng: 0.6848 },
  details: [
    "Tìm thấy con đường giải phóng dân tộc gắn với cách mạng vô sản.",
    "Chuyển từ chủ nghĩa yêu nước sang lập trường Mác-Lênin - hạt nhân tư tưởng hình thành."
  ],
  media: [
    // ảnh local trong /public
    { type: "image", src: "/2_pic_2_daihoitours.png", alt: "Đại hội Tours 1920" },
  ],
  links: [
    // link tới trang Commons gốc (không dùng làm ảnh trực tiếp vì đây là trang HTML)
    { label: "Wikipedia Commons: Ảnh Đại hội Tours", href: "https://commons.wikimedia.org/wiki/File:Congr%C3%A8s_de_Tours_-_vue_g%C3%A9n%C3%A9rale_de_la_salle.jpg" }
  ],
},


  // III. 1921-1923 (Paris): Mở rộng tầm nhìn quốc tế - báo chí cách mạng - “Le Paria”
{
  id: "1921-1923-paris",
  year: 1921,
  title: "Paris: Union Intercoloniale, báo Le Paria",
  summary:
    "Dưới tên Nguyễn Ái Quốc, cùng các chiến sĩ thuộc địa thành lập Hội Liên hiệp Thuộc địa; nòng cốt tờ Le Paria (Người cùng khổ) - báo chí thành vũ khí thức tỉnh các dân tộc bị áp bức.",
  location: { name: "Paris, Pháp", lat: 48.8566, lng: 2.3522 },
  details: [
    "Bước phát triển tư duy: từ lòng yêu nước sang lập trường quốc tế vô sản.",
    "Trực tiếp chuẩn bị cho đường lối giải phóng dân tộc ở Việt Nam."
  ],
  media: [
    // dùng ảnh local trong /public
    { type: "image", src: "/3_pic_1.png", alt: "Le Paria - triển lãm 100 năm, Paris (1921-1923)" }
  ],
  links: [
    { label: "VietnamPlus: Le Paria newspaper spreads…", href: "https://en.vietnamplus.vn/le-paria-newspaper-spreads-nguyen-ai-quocs-revolutionary-journalism-post235335.vnp?utm" }
  ],
},

// IV. 1923-1924 (Liên Xô): Bổ sung lý luận Mác-Lênin - Hoạt động QTCS
{
  id: "1923-1924-lien-xo",
  year: 1923,
  title: "Liên Xô: Trường Phương Đông, Đại hội V Quốc tế Cộng sản (1924)",
  summary:
    "Học ngắn hạn tại KUTV và tham dự, phát biểu tại Đại hội V QTCS (1924) - củng cố nền tảng lý luận cho con đường giải phóng dân tộc.",
  location: { name: "Moscow, Liên Xô", lat: 55.7558, lng: 37.6173 },
  details: [
    "Bổ sung, hệ thống hóa lý luận Mác-Lênin về cách mạng thuộc địa.",
    "Khẳng định vai trò cách mạng thuộc địa trong cách mạng thế giới."
  ],
  media: [
    {
      type: "image",
      src: "https://baotanglichsu.vn/DataFiles/Uploaded/image/data%20Hung/thang%206%20nam%202014/Dai%20hoi%20lan%20thu%20V%20quoc%20te%20cong%20san%20tai%20Matcova/2.jpg",
      alt: "Thẻ đại biểu Đại hội V Quốc tế Cộng sản"
    }
  ],
  links: [
    {
      label: "Bảo tàng Lịch sử Quốc gia: 90 năm (6/1924-6/2014) Nguyễn Ái Quốc dự Đại hội V QTCS",
      href: "https://baotanglichsu.vn/vi/Articles/3097/16508/cach-djay-90-nam-6-1924-6-2014-lanh-tu-nguyen-ai-quoc-tham-du-djai-hoi-lan-thu-v-cua-quoc-te-cong-san-tai-matxcova.html"
    }
  ],
},

// V. 1924-1927 (Quảng Châu): Tổ chức lực lượng - “Bản án…”, Hội VN CM Thanh niên, “Đường Kách mệnh”
{
  id: "1925-1927-quang-chau",
  year: 1925,
  title: "Quảng Châu: Hội VN Cách mạng Thanh niên; “Bản án…”, “Đường Kách mệnh”",
  summary:
    "Tổ chức, huấn luyện lực lượng; ra báo Thanh Niên; xuất bản “Bản án chế độ thực dân Pháp” (1925) và “Đường Kách mệnh” (1927).",
  location: { name: "Quảng Châu, Trung Quốc", lat: 23.1291, lng: 113.2644 },
  details: [
    "Hệ tư tưởng cách mạng Việt Nam hình thành cơ bản: độc lập dân tộc gắn liền với CNXH; cách mạng là sự nghiệp của quần chúng; cần có một Đảng kiểu mới lãnh đạo.",
    "Báo Thanh Niên - cơ quan tuyên truyền của Hội.",
    "Bản án chế độ thực dân Pháp (Paris 1925) - “cáo trạng” hệ thống thuộc địa, vũ khí lý luận-tuyên truyền. Link tác phẩm: [Archive.org](https://archive.org/details/ebook_ban_an_che_do_thuc_dan_phap_3394/page/31/mode/2up?utm_source=chatgpt.com)"
  ],
  media: [
    { type: "image", src: "/5_pic_1.png", alt: "Bản án chế độ thực dân Pháp / Quảng Châu 1925-1927" }
  ],
  links: [
    { label: "“Bản án chế độ thực dân Pháp” (archive - trang tổng)", href: "https://archive.org/details/ban-an-che-do-thuc-dan-phap-nguyen-ai-quoc/" }
  ],
},

// VI. 1928-1930: “Vô sản hóa”, hợp nhất thành ĐCSVN (2/1930)
{
  id: "1930-dang-csvn",
  year: 1930,
  title: "Hợp nhất thành Đảng Cộng sản Việt Nam (2/1930)",
  summary:
    "Từ phong trào “vô sản hóa” đến hợp nhất các tổ chức cộng sản tại Hương Cảng; thông qua Chánh cương, Sách lược vắn tắt do Người khởi thảo.",
  location: { name: "Hương Cảng (Hong Kong)", lat: 22.3193, lng: 114.1694 },
  details: [
    "Xác lập chiến lược: độc lập dân tộc gắn với CNXH; cách mạng do giai cấp công nhân lãnh đạo; lực lượng chủ yếu là công - nông.",
    "Mặt trận dân tộc thống nhất; đặt nền tảng tổ chức lãnh đạo cách mạng.",
    "Dấu mốc trước đó: Chi bộ cộng sản đầu tiên (3/1929) tại 5D Hàm Long - Hà Nội."
  ],
  media: [
    {
      type: "image",
      src: "/7_pic_1_HamLongHoNoiChiCongSanDauTien.png",
      alt: "Nhà 5D Hàm Long - Chi bộ Cộng sản đầu tiên (3/1929)"
    }
  ],
},

// VII. 1930-1945: Kiên định - Pác Bó (1941) - Việt Minh - Tuyên ngôn Độc lập (2/9/1945)
{
  id: "1941-pac-bo-viet-minh",
  year: 1941,
  title: "Về nước (28/1/1941), Pác Bó - thành lập Việt Minh (19/5/1941)",
  summary:
    "Giữ vững tư tưởng đại đoàn kết; xây dựng căn cứ; thành lập Mặt trận Việt Minh - chuẩn bị khởi nghĩa.",
  location: { name: "Pác Bó, Cao Bằng", lat: 22.85, lng: 106.35 },
  details: [
    "Đại đoàn kết toàn dân, mặt trận dân tộc thống nhất; khởi nghĩa toàn dân khi thời cơ đến."
  ],
  media: [
    {
      type: "image",
      src: "/7_pic_1_HamLongHoNoiChiCongSanDauTien.png",
      alt: "Pác Bó 1941 - Căn cứ cách mạng, tiền đề cho khởi nghĩa"
    }
  ],
},

{
  id: "1945-doc-lap",
  year: 1945,
  title: "Tổng khởi nghĩa - Tuyên ngôn Độc lập (2/9/1945)",
  summary:
    "Cách mạng Tháng Tám thành công; Bác đọc Tuyên ngôn Độc lập tại Ba Đình - hiện thực hóa chân lý “Độc lập cho dân tộc, tự do - hạnh phúc cho nhân dân”.",
  location: { name: "Quảng trường Ba Đình, Hà Nội", lat: 21.034, lng: 105.837 },
  details: [
    "Nhà nước dân chủ nhân dân ra đời - mở đầu thời kỳ mới của dân tộc."
  ],
  media: [
    {
      type: "image",
      src: "/7_pic_2_PacBoTuyenNgonDocLap.png",
      alt: "2/9/1945 - Tuyên ngôn Độc lập tại Quảng trường Ba Đình"
    }
  ],
},

  // VIII. 1945-1954: Nhà nước của dân - do dân - vì dân; chiến tranh nhân dân; Lời kêu gọi (19/12/1946)
  {
    id: "1946-loi-keu-goi",
    year: 1946,
    title: "Lời kêu gọi Toàn quốc kháng chiến (19/12/1946)",
    summary:
      "Đường lối kháng chiến: toàn dân - toàn diện - trường kỳ - tự lực cánh sinh; đoàn kết quốc tế.",
    location: { name: "Hà Nội / Việt Bắc", lat: 21.05, lng: 105.83 },
    links: [
      { label: "Toàn văn “Lời kêu gọi Toàn quốc kháng chiến”", href: "https://nhandan.vn/loi-keu-goi-toan-quoc-khang-chien-post596694.html" }
    ],
  },
  {
    id: "1947-sua-doi-loi-lam-viec",
    year: 1947,
    title: "“Sửa đổi lối làm việc” (10/1947)",
    summary:
      "Văn kiện then chốt xây dựng Đảng cầm quyền trong kháng chiến; chỉnh phong, rèn luyện cán bộ.",
    location: { name: "Việt Bắc (ATK)", lat: 21.95, lng: 105.2 },
    media: [
      {
        type: "image",
        src: "https://tuyenquang.dcs.vn/Image/Large/202258154624_90444.jpg",
        alt: "Bìa “Sửa đổi lối làm việc” (1947)"
      }
    ],
  },
  {
    id: "1949-dan-van",
    year: 1949,
    title: "“Dân vận” (15/10/1949)",
    summary:
      "Khẳng định “quyền hành và lực lượng đều ở nơi dân” - trọng tâm tư tưởng Nhà nước của dân, do dân, vì dân.",
    location: { name: "Việt Bắc (ATK)", lat: 21.95, lng: 105.2 },
  },

  // IX. 1951-1969: Hoàn thiện hệ thống tư tưởng trong xây dựng - bảo vệ Tổ quốc
  {
    id: "1951-dai-hoi-ii",
    year: 1951,
    title: "Đại hội II - Đảng Lao động Việt Nam",
    summary:
      "Đảng ra công khai (2/1951); Bác làm Chủ tịch Đảng; hoàn chỉnh đường lối dân tộc - dân chủ; củng cố Đảng cầm quyền.",
    location: { name: "Tuyên Quang / Việt Bắc", lat: 21.82, lng: 105.21 },
  },
  {
    id: "1958-dao-duc-cm",
    year: 1958,
    title: "“Đạo đức cách mạng” (12/1958)",
    summary:
      "Xây dựng đạo đức cách mạng, văn hóa mới; lấy nhân dân làm trung tâm; đại đoàn kết làm sức mạnh.",
    location: { name: "Hà Nội", lat: 21.03, lng: 105.85 },
  },
  {
    id: "1969-quet-sach-cncn",
    year: 1969,
    title: "“Nâng cao đạo đức cách mạng, quét sạch chủ nghĩa cá nhân” (3/2/1969)",
    summary:
      "Nhấn mạnh đấu tranh với chủ nghĩa cá nhân; giữ gìn sự trong sạch, vững mạnh của Đảng cầm quyền.",
    location: { name: "Hà Nội", lat: 21.03, lng: 105.85 },
  },
  {
    id: "1969-di-chuc",
    year: 1969,
    title: "Di chúc (1969)",
    summary:
      "Kết tinh tầm nhìn chiến lược: “việc Đảng, việc dân, việc người”; nhất quán chân lý “độc lập dân tộc gắn liền với CNXH”, kết hợp sức mạnh dân tộc - thời đại.",
    location: { name: "Hà Nội", lat: 21.03, lng: 105.85 },
  },
];
