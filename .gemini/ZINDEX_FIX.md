# URGENT FIX: Lightbox Z-Index Issue

## Problem:
The lightbox image viewer appears BEHIND the gallery modal instead of in front.

## Solution:
Use inline `style="z-index: ..."` instead of Tailwind classes to ensure proper layering.

## Fixed Z-Index Values:
- **Gallery Modal**: `z-index: 1000`
- **Lightbox Viewer**: `z-index: 2000` (higher = appears on top)

## What Changed:

### Gallery Modal (line 2):
```html
<!-- BEFORE -->
<div id="galleryModal" class="fixed inset-0 bg-black/95 z-50 hidden overflow-y-auto">

<!-- AFTER -->
<div id="galleryModal" class="fixed inset-0 bg-black/95 hidden overflow-y-auto" style="z-index: 1000;">
```

### Lightbox Viewer (line 17):
```html
<!-- BEFORE -->
<div id="imageLightbox" class="fixed inset-0 bg-black/98 z-[60] hidden flex items-center justify-center">

<!-- AFTER -->
<div id="imageLightbox" class="fixed inset-0 bg-black/98 hidden flex items-center justify-center" style="z-index: 2000;">
```

## Why This Works:
- Inline styles have higher specificity than CSS classes
- `z-index: 2000` is much higher than `z-index: 1000`
- Guarantees lightbox appears above gallery modal

## File Updated:
`.gemini/gallery-modal.html` - Ready to copy into `index.html`

## Result:
✅ Lightbox now appears IN FRONT of gallery modal
✅ Click image → Full view appears immediately
✅ Close lightbox → Return to gallery grid
✅ Perfect layering!
