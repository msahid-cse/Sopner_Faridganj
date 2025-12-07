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
    const formatDate = (d) => {
        const pad = (n) => String(n).padStart(2, '0');
        return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) +
            'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + 'Z';
    };

    const start = new Date('2025-12-19T09:00:00+06:00');
    const end = new Date('2025-12-19T13:00:00+06:00');
    const now = new Date();

    const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Sopner Faridganj//EN',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        'UID:' + now.getTime() + '@sopnerfaridganj.com',
        'DTSTAMP:' + formatDate(now),
        'DTSTART:' + formatDate(start),
        'DTEND:' + formatDate(end),
        'SUMMARY:Sopner Faridganj Scholarship Exam 2025',
        'DESCRIPTION:Sopner Faridganj 1st Anniversary Scholarship Exam. Subjects: Bangla English Math General Knowledge',
        'LOCATION:Faridganj Government Degree College',
        'STATUS:CONFIRMED',
        // Reminder 1: 3 days before
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        'TRIGGER:-P3D',
        'DESCRIPTION:Exam in 3 days - Start your preparation!',
        'END:VALARM',
        // Reminder 2: 1 day before
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        'TRIGGER:-P1D',
        'DESCRIPTION:Exam tomorrow - Final preparation!',
        'END:VALARM',
        // Reminder 3: 3 hours before
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        'TRIGGER:-PT3H',
        'DESCRIPTION:Exam in 3 hours - Leave on time!',
        'END:VALARM',
        // Reminder 4: 1 hour before
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        'TRIGGER:-PT1H',
        'DESCRIPTION:Exam in 1 hour - Leave now!',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Scholarship_Exam_2025.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('✅ ICS ফাইল ডাউনলোড হয়েছে!\n\n📝 স্বপ্নের ফরিদগঞ্জ বৃত্তি পরীক্ষা ২০২৫\n📅 তারিখ: ১৯ ডিসেম্বর ২০২৫\n⏰ সময়: সকাল ৯টা\n\n🔔 ৪টি রিমাইন্ডার যুক্ত:\n• ৩ দিন আগে\n• ১ দিন আগে\n• ৩ ঘণ্টা আগে\n• ১ ঘণ্টা আগে\n\n💡 আপনার ক্যালেন্ডার অ্যাপে ইমপোর্ট করুন');
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
