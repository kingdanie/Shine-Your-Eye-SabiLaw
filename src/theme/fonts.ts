// Deep-imported (not `from '@expo-google-fonts/zilla-slab'`) deliberately:
// each font package's top-level index unconditionally requires every
// weight AND italic variant (10 files, ~2MB for Zilla Slab alone) the
// moment any named export is used, since Metro doesn't tree-shake those
// requires. Importing each weight's own submodule bundles only that file.
import { ZillaSlab_400Regular } from '@expo-google-fonts/zilla-slab/400Regular';
import { ZillaSlab_600SemiBold } from '@expo-google-fonts/zilla-slab/600SemiBold';
import { ZillaSlab_700Bold } from '@expo-google-fonts/zilla-slab/700Bold';
import { WorkSans_400Regular } from '@expo-google-fonts/work-sans/400Regular';
import { WorkSans_500Medium } from '@expo-google-fonts/work-sans/500Medium';
import { WorkSans_600SemiBold } from '@expo-google-fonts/work-sans/600SemiBold';
import { WorkSans_700Bold } from '@expo-google-fonts/work-sans/700Bold';

/** Passed straight to `useFonts()` in the root layout. */
export const appFonts = {
  ZillaSlab_400Regular,
  ZillaSlab_600SemiBold,
  ZillaSlab_700Bold,
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
};
