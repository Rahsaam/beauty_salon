declare module 'persian-date' {
    class PersianDate {
      constructor(date?: Date | number[] | string);
      format(pattern?: string): string;
      add(unit: string, value: number): PersianDate;
      subtract(unit: string, value: number): PersianDate;
      startOf(unit: string): PersianDate;
      endOf(unit: string): PersianDate;
      toLocale(locale: string): PersianDate;
      // Add more methods as needed based on your usage
    }
    export default PersianDate;
  }