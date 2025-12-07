// // ============================================
// // ICS FILE DOWNLOAD FUNCTION
// // Scholarship Exam 2025 - Calendar Event
// // ============================================

// function downloadICS() {
//     const eventTitle = 'স্বপ্নের ফরিদগঞ্জ বৃত্তি পরীক্ষা ২০২৫';
//     const eventDescription = 'স্বপ্নের ফরিদগঞ্জের ১ম প্রতিষ্ঠা বার্ষিকী উপলক্ষে বৃত্তি পরীক্ষা। বিষয়: বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান';
//     const eventLocation = 'ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ, ফরিদগঞ্জ, চাঁদপুর';

//     const startDate = new Date('2025-12-19T09:00:00+06:00');
//     const endDate = new Date('2025-12-19T13:00:00+06:00');

//     const formatICSDate = (date) => {
//         return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
//     };

//     const escapeICS = (str) => {
//         return str.replace(/\\/g, '\\\\')
//             .replace(/;/g, '\\;')
//             .replace(/,/g, '\\,')
//             .replace(/\n/g, '\\n');
//     };

//     // Encode Bangla text for ICS (UTF-8 quoted-printable)
//     const qpEncode = (text) =>
//         text.split('').map(c => {
//             const code = c.charCodeAt(0);
//             return code > 127 ? '=' + code.toString(16).toUpperCase() : c;
//         }).join('');

//     const uid = `scholarship-exam-${Date.now()}@sopnerfaridganj.com`;
//     const dtstamp = formatICSDate(new Date());
//     const dtstart = formatICSDate(startDate);
//     const dtend = formatICSDate(endDate);

//     const icsLines = [
//         'BEGIN:VCALENDAR',
//         'VERSION:2.0',
//         'CALSCALE:GREGORIAN',
//         'METHOD:PUBLISH',
//         'BEGIN:VEVENT',
//         `UID:${uid}`,
//         `DTSTAMP:${dtstamp}`,
//         `DTSTART:${dtstart}`,
//         `DTEND:${dtend}`,
//         'SUMMARY;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:' + qpEncode(eventTitle),
//         'DESCRIPTION;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:' + qpEncode(eventDescription),
//         'LOCATION;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:' + qpEncode(eventLocation),
//         'STATUS:CONFIRMED',

//         // Alarms (MUST be ASCII only)
//         'BEGIN:VALARM',
//         'TRIGGER:-P3D',
//         'ACTION:DISPLAY',
//         'DESCRIPTION:Exam reminder (3 days before)',
//         'END:VALARM',

//         'BEGIN:VALARM',
//         'TRIGGER:-P1D',
//         'ACTION:DISPLAY',
//         'DESCRIPTION:Exam reminder (1 day before)',
//         'END:VALARM',

//         'BEGIN:VALARM',
//         'TRIGGER:-PT3H',
//         'ACTION:DISPLAY',
//         'DESCRIPTION:Exam in 3 hours',
//         'END:VALARM',

//         'BEGIN:VALARM',
//         'TRIGGER:-PT1H',
//         'ACTION:DISPLAY',
//         'DESCRIPTION:Exam in 1 hour',
//         'END:VALARM',

//         'END:VEVENT',
//         'END:VCALENDAR'
//     ];

//     const icsContent = icsLines.join('\r\n');

//     const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'বৃত্তি_পরীক্ষা_২০২৫.ics';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     setTimeout(() => URL.revokeObjectURL(link.href), 200);

//     alert('📅 ক্যালেন্ডারে সফলভাবে যোগ হয়েছে!\n\n📝 স্বপ্নের ফরিদগঞ্জ বৃত্তি পরীক্ষা ২০২৫\n📅 তারিখ: ১৯ ডিসেম্বর ২০২৫\n⏰ সময়: সকাল ৯টা\n\n🔔 ৪টি রিমাইন্ডার যুক্ত:\n• ৩ দিন আগে\n• ১ দিন আগে\n• ৩ ঘণ্টা আগে\n• ১ ঘণ্টা আগে');
// }


function downloadICS() {

    const eventTitle = "স্বপ্নের ফরিদগঞ্জ বৃত্তি পরীক্ষা ২০২৫";
    const eventDescription = "স্বপ্নের ফরিদগঞ্জের ১ম প্রতিষ্ঠা বার্ষিকী উপলক্ষে বৃত্তি পরীক্ষা। বিষয়: বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান";
    const eventLocation = "ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ, ফরিদগঞ্জ, চাঁদপুর";

    const startDate = new Date("2025-12-19T09:00:00+06:00");
    const endDate = new Date("2025-12-19T13:00:00+06:00");

    // Convert to UTC ICS format
    const formatICSDate = (date) =>
        date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    // Base64 encode UTF-8 text
    const base64 = (str) =>
        btoa(unescape(encodeURIComponent(str)));

    const uid = `scholarship-${Date.now()}@sopnerfaridganj.com`;

    const icsLines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",

        `UID:${uid}`,
        `DTSTAMP:${formatICSDate(new Date())}`,
        `DTSTART:${formatICSDate(startDate)}`,
        `DTEND:${formatICSDate(endDate)}`,

        // Bangla text (must be Base64 for iOS & Google)
        `SUMMARY;CHARSET=UTF-8;ENCODING=BASE64:${base64(eventTitle)}`,
        `DESCRIPTION;CHARSET=UTF-8;ENCODING=BASE64:${base64(eventDescription)}`,
        `LOCATION;CHARSET=UTF-8;ENCODING=BASE64:${base64(eventLocation)}`,

        "STATUS:CONFIRMED",

        // Reminders — MUST be ASCII only
        "BEGIN:VALARM",
        "TRIGGER:-P3D",
        "ACTION:DISPLAY",
        "DESCRIPTION:Exam reminder (3 days before)",
        "END:VALARM",

        "BEGIN:VALARM",
        "TRIGGER:-P1D",
        "ACTION:DISPLAY",
        "DESCRIPTION:Exam reminder (1 day before)",
        "END:VALARM",

        "BEGIN:VALARM",
        "TRIGGER:-PT3H",
        "ACTION:DISPLAY",
        "DESCRIPTION:Exam in 3 hours",
        "END:VALARM",

        "BEGIN:VALARM",
        "TRIGGER:-PT1H",
        "ACTION:DISPLAY",
        "DESCRIPTION:Exam in 1 hour",
        "END:VALARM",

        "END:VEVENT",
        "END:VCALENDAR"
    ].join("\r\n");

    // Download ICS file
    const blob = new Blob([icsLines], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "বৃত্তি_পরীক্ষা_২০২৫.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(link.href), 200);

    alert("📅 সফলভাবে আপনার ক্যালেন্ডারে যোগ হয়েছে!");
}
