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
