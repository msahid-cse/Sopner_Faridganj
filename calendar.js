// ============================================
// CALENDAR ICS DOWNLOAD FUNCTION
// Simplified and tested for maximum compatibility
// ============================================

function addToCalendar() {
    // Minimal ICS file - no reminders, simplest format
    const now = new Date();
    const timestamp = now.getTime();

    // Format: YYYYMMDDTHHMMSSZ
    const formatDate = (d) => {
        const pad = (n) => String(n).padStart(2, '0');
        return d.getUTCFullYear() +
            pad(d.getUTCMonth() + 1) +
            pad(d.getUTCDate()) + 'T' +
            pad(d.getUTCHours()) +
            pad(d.getUTCMinutes()) +
            pad(d.getUTCSeconds()) + 'Z';
    };

    const start = new Date('2025-12-19T09:00:00+06:00');
    const end = new Date('2025-12-19T13:00:00+06:00');

    // Absolute minimal ICS
    const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//SopnerFaridganj//EN',
        'BEGIN:VEVENT',
        'UID:' + timestamp + '@sopnerfaridganj.com',
        'DTSTAMP:' + formatDate(now),
        'DTSTART:' + formatDate(start),
        'DTEND:' + formatDate(end),
        'SUMMARY:Scholarship Exam 2025',
        'DESCRIPTION:Sopner Faridganj Scholarship Exam',
        'LOCATION:Faridganj Degree College',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    // Download
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exam.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('✅ ICS ফাইল ডাউনলোড হয়েছে!\n\n📝 স্বপ্নের ফরিদগঞ্জ বৃত্তি পরীক্ষা ২০২৫\n📅 তারিখ: ১৯ ডিসেম্বর ২০২৫\n⏰ সময়: সকাল ৯টা\n\n⚠️ Testing: No reminders');
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
