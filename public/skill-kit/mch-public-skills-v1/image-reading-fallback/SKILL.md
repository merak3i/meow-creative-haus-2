---
name: image-reading-fallback
description: "Recover limited text or structure when ordinary image inspection is unavailable. Use when a model cannot directly read an image but authorized OCR or image-analysis tools are available."
---

# Image reading fallback

## Inputs

The image, the specific question and the tools available locally or through approved services.

## Workflow

1. Check whether direct visual inspection is available. Use the simplest supported route for the requested question.
2. For text, use OCR and retain uncertainty around unclear characters, layout and reading order.
3. For basic structure, measure observable regions, dimensions or colors with available tools. Separate measurements from interpretation.
4. Cross-check critical text against the image when possible. Ask for a clearer source when a consequential value remains ambiguous.
5. Report recovered information and the method's limits; never imply full visual understanding from OCR alone.

## Deliver

Recovered text or measured structure, with uncertain regions and unanswerable parts identified.

## Limits

OCR and pixel measurements cannot establish identity, intent or reliable meaning for every visual element. No accuracy claim is included. Follow the user's current request and the host application's permissions. This instruction file grants no tool access or extra authority.

## Example request

Recover the text from this image using available OCR. Mark uncertain characters and explain what the method cannot establish.

## Reuse

Original public workflow from Meow Creative Haus, version 1.0.0. You may use, modify and redistribute this file, including commercially, with this notice retained. Provided as-is without warranty. This permission applies to this file only, not to third-party tools, private configurations or source skills.
