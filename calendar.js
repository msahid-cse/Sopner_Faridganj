// ============================================
// GOOGLE CALENDAR INTEGRATION
// Works on Android, iOS, Desktop
// ============================================

function addToCalendar() {
    // Event details
    const title = 'স্বপ্নের ফরিদগঞ্জ বৃত্তি পরীক্ষা ২০২৫';
    const description = 'স্বপ্নের ফরিদগঞ্জের ১ম প্রতিষ্ঠা বার্ষিকী উপলক্ষে বৃত্তি পরীক্ষা। বিষয়: বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান';
    const location = 'ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ, ফরিদগঞ্জ, চাঁদপুর';

    // Date: December 19, 2025, 9:00 AM - 1:00 PM (Bangladesh Time)
    // Format for Google Calendar: YYYYMMDDTHHmmss
    const startDate = '20251219T090000';
    const endDate = '20251219T130000';

    // Create Google Calendar URL
    const googleCalendarUrl = 'https://calendar.google.com/calendar/render?' +
        'action=TEMPLATE' +
        '&text=' + encodeURIComponent(title) +
        '&dates=' + startDate + '/' + endDate +
        '&details=' + encodeURIComponent(description) +
        '&location=' + encodeURIComponent(location) +
        '&ctz=Asia/Dhaka';

    // Open in new window/tab
    window.open(googleCalendarUrl, '_blank');

    // Show confirmation
    alert('✅ Google Calendar খুলছে!\n\n📝 স্বপ্নের ফরিদগঞ্জ বৃত্তি পরীক্ষা ২০২৫\n📅 তারিখ: ১৯ ডিসেম্বর ২০২৫\n⏰ সময়: সকাল ৯টা\n📍 স্থান: ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ\n\n💡 Google Calendar এ "Save" বাটনে ক্লিক করুন');
}

// ICS Download Function (with 4 custom reminders)
function downloadICS() {
    // Event details
    const eventTitle = 'স্বপ্নের ফরিদগঞ্জ বৃত্তি পরীক্ষা ২০২৫';
    const eventDescription = 'স্বপ্নের ফরিদগঞ্জের ১ম প্রতিষ্ঠা বার্ষিকী উপলক্ষে বৃত্তি পরীক্ষা। বিষয়: বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান';
    const eventLocation = 'ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ, ফরিদগঞ্জ, চাঁদপুর';
    const eventLocationUrl = 'https://maps.app.goo.gl/hzJ5J2tQ5kZ4n7XNA';

    // Date: December 19, 2025, 9:00 AM - 1:00 PM (Bangladesh Time)
    const startDate = new Date('2025-12-19T09:00:00+06:00');
    const endDate = new Date('2025-12-19T13:00:00+06:00');

    // Format date to ICS UTC format
    const formatICSDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    // Escape ICS characters
    const escapeICS = (str) => {
        return str.replace(/\\/g, '\\\\')
            .replace(/;/g, '\\;')
            .replace(/,/g, '\\,')
            .replace(/\n/g, '\\n');
    };

    const startDateFormatted = formatICSDate(startDate);
    const endDateFormatted = formatICSDate(endDate);
    const currentDate = formatICSDate(new Date());

    // UID
    const uniqueUID = `scholarship-exam-2025-${Date.now()}@sopnerfaridganj.com`;

    // ICS Content
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Sopner Faridganj//Scholarship Exam 2025//EN',
        'CALSCALE:GREGORIAN',

        // TIMEZONE BLOCK (Required for Google/Apple)
        'BEGIN:VTIMEZONE',
        'TZID:Asia/Dhaka',
        'BEGIN:STANDARD',
        'DTSTART:19700101T000000',
        'TZOFFSETFROM:+0600',
        'TZOFFSETTO:+0600',
        'TZNAME:BDT',
        'END:STANDARD',
        'END:VTIMEZONE',

        'BEGIN:VEVENT',
        `UID:${uniqueUID}`,
        `DTSTAMP:${currentDate}`,
        `DTSTART:${startDateFormatted}`,
        `DTEND:${endDateFormatted}`,
        `SUMMARY:${escapeICS(eventTitle)}`,
        `DESCRIPTION:${escapeICS(eventDescription)}`,
        `LOCATION:${escapeICS(eventLocation)}`,
        `URL:${eventLocationUrl}`,
        'STATUS:CONFIRMED',
        'TRANSP:OPAQUE',
        'SEQUENCE:0',

        // Reminder 1 - 3 days before
        'BEGIN:VALARM',
        'TRIGGER:-P3D',
        'ACTION:DISPLAY',
        'DESCRIPTION:Exam Reminder (3 days before)',
        'END:VALARM',

        // Reminder 2 - 1 day before
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'ACTION:DISPLAY',
        'DESCRIPTION:Exam Reminder (1 day before)',
        'END:VALARM',

        // Reminder 3 - 3 hours before
        'BEGIN:VALARM',
        'TRIGGER:-PT3H',
        'ACTION:DISPLAY',
        'DESCRIPTION:Exam Reminder (3 hours before)',
        'END:VALARM',

        // Reminder 4 - 1 hour before
        'BEGIN:VALARM',
        'TRIGGER:-PT1H',
        'ACTION:DISPLAY',
        'DESCRIPTION:Exam Reminder (1 hour before)',
        'END:VALARM',

        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    // Download file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'বৃত্তি_পরীক্ষা_২০২৫.ics';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
        window.URL.revokeObjectURL(link.href);
    }, 100);

    alert('✅ পরীক্ষার তারিখ সফলভাবে ক্যালেন্ডারে যুক্ত হয়েছে!\n\n📝 স্বপ্নের ফরিদগঞ্জ বৃত্তি পরীক্ষা ২০২৫\n📅 তারিখ: ১৯ ডিসেম্বর ২০২৫\n⏰ সময়: সকাল ৯টা\n\n🔔 ৪টি রিমাইন্ডার যুক্ত:\n• ৩ দিন আগে\n• ১ দিন আগে\n• ৩ ঘণ্টা আগে\n• ১ ঘণ্টা আগে');
}

// Splash Screen Close Function
function closeSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    if (splashScreen) {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 300);
    }
}

// Auto-close splash screen after 3 seconds
window.addEventListener('load', function () {
    setTimeout(closeSplashScreen, 3000);
});
