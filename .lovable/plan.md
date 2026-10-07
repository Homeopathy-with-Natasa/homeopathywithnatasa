# Booking confirmation update

## Build
- Listen for successful Cal.com bookings in the inline booking area.
- Show the requested confirmation panel after every booking.
- Include the questionnaire action only for adult and child first consultations, with the child form preselected.
- Read `?type=child` on the questionnaire and preselect the child path.
- Change the Terms host from Netlify to Lovable and set the canonical site URL to the incoming custom domain.
- Update the stored hosting requirement from Netlify to Lovable.

## Technical details
- Keep the existing service list, layout, fonts, colours, bilingual structure, and all unrelated copy unchanged.
- Register and clean up the Cal.com `bookingSuccessful` listener with the selected service in scope.
