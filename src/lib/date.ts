import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import type { CvData } from "@/types/cv";

dayjs.extend(relativeTime);
dayjs.locale("id", {
  name: "id",
  weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
  months:
    "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split(
      "_",
    ),
  weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
  monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"),
  weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
  ordinal: () => "",
  formats: {
    LT: "HH.mm",
    LTS: "HH.mm.ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY [pukul] HH.mm",
    LLLL: "dddd, D MMMM YYYY [pukul] HH.mm",
  },
  relativeTime: {
    future: "dalam %s",
    past: "%s yang lalu",
    s: 'beberapa saat',
    m: "satu menit",
    mm: "%d menit",
    h: "satu jam",
    hh: "%d jam",
    d: "satu hari",
    dd: "%d hari",
    M: "satu bulan",
    MM: "%d bulan",
    y: "satu tahun",
    yy: "%d tahun"
  }
});

export function formatDate(dateStr: string, locale: "en" | "id"): string {
  return dayjs(dateStr).locale(locale).format("MMMM YYYY");
}

export function formatDateRange(
  start: string,
  end: string | null,
  locale: "en" | "id",
  fallbackLabel: string,
): string {
  const s = formatDate(start, locale);
  if (!end) return `${s} — ${fallbackLabel}`;
  const e = formatDate(end, locale);
  return `${s} — ${e}`;
}

export function formatBirthDate(dateStr: string, locale: "en" | "id"): string {
  return dayjs(dateStr).locale(locale).format("D MMMM YYYY");
}

export function formatUpdatedAt(cv: CvData, locale: "en" | "id"): string {
  return dayjs(cv.updated_at).locale(locale).format("D MMMM YYYY");
}

export function yearNow(): string {
  return dayjs().format("YYYY");
}
