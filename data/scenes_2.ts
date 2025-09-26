// data/scenes_2.ts
// Tập dữ liệu cho storytelling: mỗi giai đoạn có 2 ảnh + 1 audio + tóm tắt
// Gợi ý dùng kèm StoriesClient (đã có hàm publicUrl chuyển public\\ → /)

export type Scene = {
  id: string;
  title: string;
  images: string[]; // 2 ảnh
  audio: string; // 1 mp3
  summary: string; // tóm tắt hiển thị dưới ảnh
};

export const SCENES: Scene[] = [
  {
    id: "1911-before",
    title: "Trước 1911 – Nền tảng gia đình, quê hương, truyền thống dân tộc",
    images: [
      "public\\1911_Trước – Nền tảng_gia đình_quê hương_truyền thống dân tộc_Pic1.png",
      "public\\1911_Trước – Nền tảng_gia đình_quê hương_truyền thống dân tộc_Pic2.png",
    ],
    audio:
      "public\\1911_Trước – Nền tảng_gia đình_quê hương_truyền thống dân tộc.mp3",
    summary:
      "Giai đoạn hình thành nhân cách: ảnh hưởng gia đình, quê hương và truyền thống dân tộc nuôi dưỡng lý tưởng yêu nước đầu đời.",
  },
  {
    id: "1911-06-05",
    title: "05.06.1911 – Người rời Tổ quốc từ Bến Nhà Rồng",
    images: [
      "public\\1911-06-05_Nguoi_roi_To_quoc_tu_Ben_Nha_Rong_Pic1.png",
      "public\\1911-06-05_Nguoi_roi_To_quoc_tu_Ben_Nha_Rong_Pic2.png",
    ],
    audio: "public\\1911-06-05_Nguoi_roi_To_quoc_tu_Ben_Nha_Rong.mp3",
    summary:
      "Rời Sài Gòn lên tàu quốc tế, bắt đầu hành trình tìm con đường giải phóng dân tộc cho Việt Nam.",
  },
  {
    id: "1911-1920",
    title:
      "1911–1920 – Đi tìm đường cứu nước, bước ngoặt đến với chủ nghĩa Mác–Lênin",
    images: [
      "public\\1911-1920_Bac_di_tim_duong_cuu_nuoc_Buoc_ngoat_den_voi_chu_nghia_Mac-Lenin_Pic1.png",
      "public\\1911-1920_Bac_di_tim_duong_cuu_nuoc_Buoc_ngoat_den_voi_chu_nghia_Mac-Lenin_Pic2.png",
    ],
    audio:
      "public\\1911-1920_Bac_di_tim_duong_cuu_nuoc_Buoc_ngoat_den_voi_chu_nghia_Mac-Lenin.mp3",
    summary:
      "Qua nhiều châu lục, quan sát các chế độ xã hội; tiếp cận và lựa chọn chủ nghĩa Mác–Lênin làm con đường cứu nước.",
  },
  {
    id: "1921-1923",
    title:
      "1921–1923 – Paris: mở rộng tầm nhìn quốc tế, báo chí cách mạng Le Paria",
    images: [
      "public\\1921-1923_Paris_mo_rong_tam_nhin_quoc_te_bao_chi_cach_mang_Le_Paria_Pic1.png",
      "public\\1921-1923_Paris_mo_rong_tam_nhin_quoc_te_bao_chi_cach_mang_Le_Paria_Pic2.png",
    ],
    audio:
      "public\\1921-1923_Paris_mo_rong_tam_nhin_quoc_te_bao_chi_cach_mang_Le_Paria.mp3",
    summary:
      "Hoạt động báo chí, tuyên truyền ở Pháp; xây dựng mạng lưới bạn bè quốc tế và cơ sở tư tưởng cho phong trào thuộc địa.",
  },
  {
    id: "1923-1924",
    title:
      "1923–1924 – Liên Xô: bổ sung lý luận Mác–Lênin, hoạt động Quốc tế Cộng sản",
    images: [
      "public\\1923-1924_Liên_Xô_bổ_sung_lý_luận_Mác-Lênin_hoạt_động_Quốc_tế_Cộng_sản_Pic1.png",
      "public\\1923-1924_Liên_Xô_bổ_sung_lý_luận_Mác-Lênin_hoạt_động_Quốc_tế_Cộng_sản_Pic2.png",
    ],
    audio:
      "public\\1923-1924_Liên_Xô_bổ_sung_lý_luận_Mác-Lênin_hoạt_động_Quốc_tế_Cộng_sản.mp3",
    summary:
      "Học tập, trao đổi kinh nghiệm cách mạng và gắn kết phong trào Việt Nam với phong trào cộng sản quốc tế.",
  },
  {
    id: "1927",
    title:
      "1927 – Quảng Châu: tổ chức lực lượng, Hội VN Cách mạng Thanh niên, \"Đường Kách Mệnh\"",
    images: [
      "public\\1927_Quang_Chau_to_chuc_luc_luong_Ban_an_Hoi_VN_Cach_mang_Thanh_nien_Duong_Kach_menh_Pic1.png",
      "public\\1927_Quang_Chau_to_chuc_luc_luong_Ban_an_Hoi_VN_Cach_mang_Thanh_nien_Duong_Kach_menh_Pic2.png",
    ],
    audio:
      "public\\1927_Quang_Chau_to_chuc_luc_luong_Ban_an_Hoi_VN_Cach_mang_Thanh_nien_Duong_Kach_menh.mp3",
    summary:
      "Xây dựng tổ chức tiền thân, đào tạo cán bộ, biên soạn tài liệu lý luận – đặt nền cho phong trào cách mạng trong nước.",
  },
  {
    id: "1928-1930",
    title:
      "1928–1930 – Vô sản hóa, hợp nhất thành Đảng Cộng sản Việt Nam (02.1930)",
    images: [
      "public\\1928-1930_vo_san_hoa_hop_nhat_thanh_Dang_Cong_san_Viet_Nam_1930-02_Pic1.png",
      "public\\1928-1930_vo_san_hoa_hop_nhat_thanh_Dang_Cong_san_Viet_Nam_1930-02_Pic2.png",
    ],
    audio:
      "public\\1928-1930_vo_san_hoa_hop_nhat_thanh_Dang_Cong_san_Viet_Nam_1930-02.mp3",
    summary:
      "Phong trào vô sản hóa, thống nhất các tổ chức cộng sản; thành lập ĐCSVN – cột mốc lãnh đạo cách mạng Việt Nam.",
  },
  {
    id: "1945-1954",
    title:
      "1945–1954 – Nhà nước của dân, do dân, vì dân; Lời kêu gọi Toàn quốc kháng chiến (19.12.1946)",
    images: [
      "public\\1945-1954_tu_tuong_Nha_nuoc_cua_dan_do_dan_vi_dan_chien_tranh_nhan_dan_Loi_keu_goi_Toan_quoc_khang_chien_1946-12-19_Pic1.png",
      "public\\1945-1954_tu_tuong_Nha_nuoc_cua_dan_do_dan_vi_dan_chien_tranh_nhan_dan_Loi_keu_goi_Toan_quoc_khang_chien_1946-12-19_Pic2.png",
    ],
    audio:
      "public\\1945-1954_tu_tuong_Nha_nuoc_cua_dan_do_dan_vi_dan_chien_tranh_nhan_dan_Loi_keu_goi_Toan_quoc_khang_chien_1946-12-19.mp3",
    summary:
      "Tư tưởng nhà nước vì dân, kháng chiến toàn dân – toàn diện; kiên định độc lập dân tộc và thống nhất đất nước.",
  },
  {
    id: "1951-1969",
    title:
      "1951–1969 – Hoàn thiện hệ thống tư tưởng trong xây dựng và bảo vệ Tổ quốc",
    images: [
      "public\\1951-1969_hoan_thien_he_thong_tu_tuong_trong_xay_dung_bao_ve_To_quoc_Pic1.png",
      "public\\1951-1969_hoan_thien_he_thong_tu_tuong_trong_xay_dung_bao_ve_To_quoc_Pic2.png",
    ],
    audio:
      "public\\1951-1969_hoan_thien_he_thong_tu_tuong_trong_xay_dung_bao_ve_To_quoc.mp3",
    summary:
      "Củng cố đường lối cách mạng, tăng cường đoàn kết dân tộc và quốc tế; đặt nền tảng tư tưởng cho thời kỳ tiếp theo.",
  },
];

export default SCENES;
