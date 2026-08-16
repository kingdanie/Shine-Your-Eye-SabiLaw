import React from 'react';

import { MyLegalInquiriesScreen } from '@/screens/inquiries/MyLegalInquiriesScreen';

export default function HistoryRoute() {
  return <MyLegalInquiriesScreen initialSegment="recent" />;
}
