export default interface Filter {
  style?: string;
  timePeriod?: string;
  moodTheme?: string;
  complexity?: string;
  colorScheme?: string;
  lighting?: string;
  setting?: string;
  perspective?: string;
  size?: '256x256' | '512x512' | '1024x1024';
}