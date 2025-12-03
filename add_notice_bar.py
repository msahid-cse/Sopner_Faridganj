# Add important notice marquee bar to scholarship section
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the scholarship section title
search_text = '''            <div class="text-center mb-16">
                <h2 class="section-title text-primary">বৃত্তি পরিক্ষা ২০২৫</h2>
                <p class="text-secondary mt-4 max-w-2xl mx-auto">
                    স্বপ্নের ফরিদগঞ্জের ১ম প্রতিষ্ঠা বার্ষিকী উপলক্ষে বৃত্তি পরিক্ষা
                </p>
            </div>'''

replacement_text = '''            <div class="text-center mb-16">
                <h2 class="section-title text-primary">বৃত্তি পরিক্ষা ২০২৫</h2>
                <p class="text-secondary mt-4 max-w-2xl mx-auto">
                    স্বপ্নের ফরিদগঞ্জের ১ম প্রতিষ্ঠা বার্ষিকী উপলক্ষে বৃত্তি পরিক্ষা
                </p>
                
                <!-- Important Notice Bar -->
                <div class="mt-6 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 p-4 rounded-lg shadow-lg border-2 border-red-600">
                    <div class="flex items-center gap-3">
                        <span class="text-white font-bold text-lg flex-shrink-0">📢 গুরুত্বপূর্ণ বিজ্ঞপ্তি:</span>
                        <div class="overflow-hidden flex-1">
                            <marquee behavior="scroll" direction="left" scrollamount="5" class="text-white font-semibold text-base">
                                সকল শিক্ষা প্রতিষ্ঠানে বৃত্তি পরিক্ষার প্রবেশপত্র পাঠানো হয়েছে। কেউ না পেয়ে থাকলে সিলেবাসে দেওয়া নাম্বারে যোগাযোগ করবেন। -ধন্যবাদ
                            </marquee>
                        </div>
                    </div>
                </div>
            </div>'''

if search_text in content:
    content = content.replace(search_text, replacement_text)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully added important notice marquee bar!")
else:
    print("Could not find the target section!")
