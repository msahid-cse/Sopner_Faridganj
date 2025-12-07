// ============================================
// CALENDAR ICS DOWNLOAD FUNCTION
// Simplified and tested for maximum compatibility
// ============================================

function addToCalendar() {
    // Event details (using English for maximum compatibility)
    const eventTitle = 'Sopner Faridganj Scholarship Exam 2025';
    const eventDescription = 'Sopner Faridganj 1st Anniversary Scholarship Examination. Subjects: Bangla, English, Math, General Knowledge';
    const eventLocation = 'Faridganj Government Degree College, Faridganj, Chandpur';

    // Date: December 19, 2025, 9:00 AM - 1:00 PM (Bangladesh Time = UTC+6)
    const startDate = new Date('2025-12-19T09:00:00+06:00');
    const endDate = new Date('2025-12-19T13:00:00+06:00');

    // Format date to ICS format (YYYYMMDDTHHMMSSZ in UTC)
    const formatICSDate = (date) => {
        const pad = (n) => String(n).padStart(2, '0');
        const y = date.getUTCFullYear();
        const m = pad(date.getUTCMonth() + 1);
        const d = pad(date.getUTCDate());
        const h = pad(date.getUTCHours());
        const min = pad(date.getUTCMinutes());
        const s = pad(date.getUTCSeconds());
        return `${y}${m}${d}T${h}${min}${s}Z`;
    };

    const dtstart = formatICSDate(startDate);
    const dtend = formatICSDate(endDate);
    const dtstamp = formatICSDate(new Date());
    const uid = `scholarship-exam-${Date.now()}@sopnerfaridganj.com`;

    const icsLines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Sopner Faridganj//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART:${dtstart}`,
        `DTEND:${dtend}`,
        `SUMMARY:${eventTitle}`,
        `DESCRIPTION:${eventDescription}`,
        `LOCATION:${eventLocation}`,
        'STATUS:CONFIRMED',
        'TRANSP:OPAQUE',
        // Single reminder: 1 day before (for testing)
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        'TRIGGER:-P1D',
        'DESCRIPTION:Exam tomorrow',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ];

    // Join with proper line endings
    const icsContent = icsLines.join('\r\n');

    // Create and download the file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Scholarship_Exam_2025.ics';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);

    // Show success message in Bengali
    alert('✅ পরীক্ষার তারিখ আপনার ক্যালেন্ডারে যোগ করা হয়েছে!\n\n📝 স্বপ্নের ফরিদগঞ্জ বৃত্তি পরীক্ষা ২০২৫\n📅 তারিখ: ১৯ ডিসেম্বর ২০২৫\n⏰ সময়: সকাল ৯টা\n📍 স্থান: ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ\n\n🔔 রিমাইন্ডার: ১ দিন আগে (Testing)');
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
