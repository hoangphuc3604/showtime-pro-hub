export interface Promotion {
  id: string;
  name: string;
  promotion_type: string;
  discount_value: string | null;
  start_time: string;
  end_time: string;
  poster: string;
  description: string;
}

export const promotions: Promotion[] = [
  {
    id: "promo-1",
    name: "TƯNG BỪNG KHAI TRƯƠNG - TẶNG LY LƯU NIỆM",
    promotion_type: "other",
    discount_value: null,
    start_time: "2026-03-16",
    end_time: "2026-04-11",
    poster: "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2026/022026/BINH_XUAN_N_O_350x495.png",
    description:
      "Mừng khai trương cụm rạp CineGold HCM, CineGold mang đến các ưu đãi quà tặng cực kỳ hấp dẫn luôn đây nè\n\nMANG VỀ LY LƯU NIỆM - Áp dụng đến hết ngày 11/04/2026\nTặng 01 ly lưu niệm cho 500 khách hàng đầu tiên mỗi ngày sau khi xem phim xong.\n\n1. Điều kiện và điều khoản:\n- Chỉ áp dụng cho các giao dịch hợp lệ trong thời gian chương trình diễn ra\n- Áp dụng cho giao dịch online và offline tại CineGold\n- Khách hàng nhận quà tặng tại rạp và nhận cùng thời điểm nhận bắp nước\n- Được áp dụng lũy tiến và áp dụng đồng thời với các chương trình khuyến mãi khác.\n- Không áp dụng tách hoặc gộp giá trị hóa đơn dưới mọi hình thức\n- Số lượng quà tặng có giới hạn, chương trình có thể kết thúc sớm ngay khi hết hàng",
  },
  {
    id: "promo-2",
    name: "GIẢM 20,000 VND",
    promotion_type: "reduce_fixed_amount",
    discount_value: "20000.00",
    start_time: "2026-03-16",
    end_time: "2026-04-11",
    poster: "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2026/022026/BINH_XUAN_N_O_350x495.png",
    description: "Giảm thẳng 20,000 VND cho mỗi vé.",
  },
  {
    id: "promo-3",
    name: "Happy Hour 10%",
    promotion_type: "reduce_percentage",
    discount_value: "10.00",
    start_time: "2026-03-12",
    end_time: "2026-03-15",
    poster: "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2026/022026/BINH_XUAN_N_O_350x495.png",
    description: "Giảm 10% cho khung giờ vàng.",
  },
];
