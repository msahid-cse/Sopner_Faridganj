# Update founding members to infinite scroll
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the founding members section
start_marker = '<!-- Founding Members Section -->'
end_marker = '<!-- Year Selector for Leadership -->'

start_pos = content.find(start_marker)
end_pos = content.find(end_marker)

if start_pos == -1 or end_pos == -1:
    print("Markers not found!")
    exit(1)

# New infinite scroll HTML
new_html = '''<!-- Founding Members Section -->
                <div class="mb-12">
                    <h3 class="text-2xl font-bold mb-8 text-center text-primary">প্রতিষ্ঠাতা সদস্য</h3>
                    
                    <!-- Infinite Scroll Container -->
                    <div class="founding-scroll-container overflow-hidden relative">
                        <div class="founding-scroll-track flex gap-6">
                            <!-- First set -->
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-emerald-300 dark:border-emerald-600 w-48">
                                    <img src="https://i.imghippo.com/files/Edk6771q.jpg" alt="মেহেদী আশ্রাফ লিমন"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-emerald-500">
                                    <div class="text-secondary font-semibold text-sm">মেহেদী আশ্রাফ লিমন</div>
                                </div>
                            </div>
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-blue-300 dark:border-blue-600 w-48">
                                    <img src="https://i.imghippo.com/files/Rkz8556Wc.jpg" alt="ওসমান গনি রনি"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500">
                                    <div class="text-secondary font-semibold text-sm">ওসমান গনি রনি</div>
                                </div>
                            </div>
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-purple-300 dark:border-purple-600 w-48">
                                    <img src="https://i.imghippo.com/files/Qqq6154Qw.jpg" alt="তাহসিন মিলন"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-purple-500">
                                    <div class="text-secondary font-semibold text-sm">তাহসিন মিলন</div>
                                </div>
                            </div>
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-amber-300 dark:border-amber-600 w-48">
                                    <img src="https://i.imghippo.com/files/HxDT4530dk.jpeg" alt="Md. Abdullah"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-amber-500">
                                    <div class="text-secondary font-semibold text-sm">Md. Abdullah</div>
                                </div>
                            </div>
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-teal-300 dark:border-teal-600 w-48">
                                    <img src="https://i.imghippo.com/files/viwN7243fI.jpeg" alt="Engr. Didar Hossain"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-teal-500">
                                    <div class="text-secondary font-semibold text-sm">Engr. Didar Hossain</div>
                                </div>
                            </div>
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-cyan-300 dark:border-cyan-600 w-48">
                                    <img src="https://i.imghippo.com/files/Yar7506MiI.jpeg" alt="Mohammad Rabbie"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-cyan-500">
                                    <div class="text-secondary font-semibold text-sm">Mohammad Rabbie</div>
                                </div>
                            </div>
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-pink-300 dark:border-pink-600 w-48">
                                    <img src="https://i.imghippo.com/files/PFCU4068tqE.jpeg" alt="রায়হান মাহমুদ"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-pink-500">
                                    <div class="text-secondary font-semibold text-sm">রায়হান মাহমুদ</div>
                                </div>
                            </div>
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-rose-300 dark:border-rose-600 w-48">
                                    <img src="https://i.imghippo.com/files/DE3695nLw.JPG" alt="MD RAIHAN KHAN"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-rose-500">
                                    <div class="text-secondary font-semibold text-sm">MD RAIHAN KHAN</div>
                                </div>
                            </div>
                            <!-- Duplicate for seamless loop -->
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-emerald-300 dark:border-emerald-600 w-48">
                                    <img src="https://i.imghippo.com/files/Edk6771q.jpg" alt="মেহেদী আশ্রাফ লিমন"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-emerald-500">
                                    <div class="text-secondary font-semibold text-sm">মেহেদী আশ্রাফ লিমন</div>
                                </div>
                            </div>
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-blue-300 dark:border-blue-600 w-48">
                                    <img src="https://i.imghippo.com/files/Rkz8556Wc.jpg" alt="ওসমান গনি রনি"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500">
                                    <div class="text-secondary font-semibold text-sm">ওসমান গনি রনি</div>
                                </div>
                            </div>
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-purple-300 dark:border-purple-600 w-48">
                                    <img src="https://i.imghippo.com/files/Qqq6154Qw.jpg" alt="তাহসিন মিলন"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-purple-500">
                                    <div class="text-secondary font-semibold text-sm">তাহসিন মিলন</div>
                                </div>
                            </div>
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-amber-300 dark:border-amber-600 w-48">
                                    <img src="https://i.imghippo.com/files/HxDT4530dk.jpeg" alt="Md. Abdullah"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-amber-500">
                                    <div class="text-secondary font-semibold text-sm">Md. Abdullah</div>
                                </div>
                            </div>
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-teal-300 dark:border-teal-600 w-48">
                                    <img src="https://i.imghippo.com/files/viwN7243fI.jpeg" alt="Engr. Didar Hossain"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-teal-500">
                                    <div class="text-secondary font-semibold text-sm">Engr. Didar Hossain</div>
                                </div>
                            </div>
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-cyan-300 dark:border-cyan-600 w-48">
                                    <img src="https://i.imghippo.com/files/Yar7506MiI.jpeg" alt="Mohammad Rabbie"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-cyan-500">
                                    <div class="text-secondary font-semibold text-sm">Mohammad Rabbie</div>
                                </div>
                            </div>
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-pink-300 dark:border-pink-600 w-48">
                                    <img src="https://i.imghippo.com/files/PFCU4068tqE.jpeg" alt="রায়হান মাহমুদ"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-pink-500">
                                    <div class="text-secondary font-semibold text-sm">রায়হান মাহমুদ</div>
                                </div>
                            </div>
                            <div class="founding-member-card flex-shrink-0">
                                <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-rose-300 dark:border-rose-600 w-48">
                                    <img src="https://i.imghippo.com/files/DE3695nLw.JPG" alt="MD RAIHAN KHAN"
                                        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-rose-500">
                                    <div class="text-secondary font-semibold text-sm">MD RAIHAN KHAN</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                '''

# Replace the section
new_content = content[:start_pos] + new_html + content[end_pos:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully updated founding members with infinite scroll!")
