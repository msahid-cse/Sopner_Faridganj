# Committee 2025 - Mobile Member Addition

## ✅ COMPLETED:
1. Added ইব্রাহীম রাব্বী to desktop committee carousel
2. Updated desktop dots (added Dot5)
3. Updated mobile dots (added Dot7)
4. Updated script.js - changed totalCommittee2025Members from 7 to 8
5. Updated script.js - changed totalMobileCommittee2025Members from 7 to 8

## ⚠️ REMAINING TASK:
Add ইব্রাহীম রাব্বী to the mobile committee carousel

### Location:
In `index.html`, find line ~1097 (after the Asif Iqbal member card)

### Code to Add:
Add this BEFORE the closing `</div></div></div>` tags (around line 1097):

```html
                                        <div class="flex-shrink-0 w-full px-4">
                                            <div
                                                class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-orange-300 dark:border-orange-600">
                                                <img src="https://i.imghippo.com/files/fC3640AUU.jpeg" alt="ইব্রাহীম রাব্বী"
                                                    class="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-orange-500">
                                                <div class="font-bold text-lg text-primary mb-0">অর্থ অনুমোদন</div>
                                                <div class="text-secondary font-semibold">ইব্রাহীম রাব্বী</div>
                                            </div>
                                        </div>
```

### Before:
```html
                                        <div class="flex-shrink-0 w-full px-4">
                                            <div class="...">
                                                <img src="..." alt="Asif Iqbal" ...>
                                                <div class="...">সদস্য</div>
                                                <div class="...">Asif Iqbal</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
```

### After:
```html
                                        <div class="flex-shrink-0 w-full px-4">
                                            <div class="...">
                                                <img src="..." alt="Asif Iqbal" ...>
                                                <div class="...">সদস্য</div>
                                                <div class="...">Asif Iqbal</div>
                                            </div>
                                        </div>
                                        <div class="flex-shrink-0 w-full px-4">
                                            <div class="...">
                                                <img src="..." alt="ইব্রাহীম রাব্বী" ...>
                                                <div class="...">অর্থ অনুমোদন</div>
                                                <div class="...">ইব্রাহীম রাব্বী</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
```

## After Adding:
The committee will have 8 members total and the carousel will work correctly on both desktop and mobile!
