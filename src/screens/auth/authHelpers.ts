import { Alert } from 'react-native';

/** Google/Apple sign-in buttons match the design but are non-functional in
 * this mock-auth build — see plan: no real backend/OAuth. Surface that
 * plainly instead of silently doing nothing. */
export function showPlaceholderAlert(feature: string) {
  Alert.alert(
    'Preview build',
    `${feature} isn't connected in this preview — use the phone/email field to continue.`
  );
}
