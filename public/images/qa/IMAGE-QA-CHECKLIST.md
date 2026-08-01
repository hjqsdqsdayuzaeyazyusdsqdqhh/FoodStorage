# Image QA checklist

Reject any image that fails any of these 9 gates. Machine checks are marked `ok`/`fail` by `npm run images:validate`; human gates stay `pending` until a reviewer signs off.

1. blurry food
2. duplicated objects
3. ai artifacts
4. wrong shadows
5. unrealistic hands
6. melted textures
7. incorrect labels
8. unreadable containers
9. unrealistic fridge interiors

Plus: no text, no logos, no watermarks; food is the subject; bright natural light; matches the house style (docs/IMAGE-SYSTEM.md §2).
