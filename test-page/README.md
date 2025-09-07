## README — คู่มือการใช้งาน (ภาษาไทย)


วิธีรันโปรเจคแบบสั้นๆ

- 1) cd to test-page
- 2) pnpm install
- 3) pnpm run dev
- 4) Open browser http://localhost:3000
- รองรับมุมมองมือถือ (จาก Figma) และเดสก์ท็อป



โปรเจคนี้เป็นหน้าเว็บทดสอบของ 22Circles สร้างด้วย Next.js + TypeScript + Tailwind CSS โดยออกแบบให้รองรับทั้งมุมมองมือถือ (ตาม Figma) และมุมมองเดสก์ท็อป

ข้อกำหนดล่วงหน้า

- Node.js (แนะนำ v18 ขึ้นไป)
- pnpm (ถ้ายังไม่มี ติดตั้งด้วย `npm install -g pnpm` หรือเปิดใช้ Corepack)

ขั้นตอนการรันโปรเจค (PowerShell)

เปิด PowerShell แล้วรันคำสั่งต่อไปนี้:

```powershell
cd test-page
pnpm install
pnpm run dev
```

เมื่อเซิร์ฟเวอร์ขึ้นแล้ว ให้เปิดเบราว์เซอร์ที่:

```
http://localhost:3000
```

การรองรับมุมมองมือถือและเดสก์ท็อป

- โครงสร้าง UI ถูกออกแบบให้เป็น responsive ด้วย Tailwind CSS เพื่อรองรับทั้งมือถือและเดสก์ท็อป
- องค์ประกอบที่สำคัญ (เช่น เมนู, ฟิลเตอร์, ผลิตภัณฑ์) ถูกวางและปรับขนาดตาม breakpoint ในไฟล์คอมโพเนนต์ `src/components`
- ทดสอบโดยใช้ DevTools ของเบราว์เซอร์ (Toggle device toolbar) กับขนาดตัวอย่าง: iPhone 14 Pro Max (มือถือ).


Project Specs
- Dev server มี hot-reload: แก้โค้ดแล้วบันทึกเพื่อดูการเปลี่ยนแปลงทันที
- หากเจอปัญหา dependency ให้ลบ `node_modules` และ `pnpm-lock.yaml` แล้วรัน `pnpm install` ใหม่
- เปลี่ยนพอร์ตถ้าจำเป็นโดยตั้งตัวแปร ENV หรือแก้สคริปต์ใน `package.json`

การแก้ไขปัญหาพื้นฐาน

- `pnpm install` ล้มเหลว: ตรวจสอบเวอร์ชัน Node.js และสิทธิ์การเข้าถึงเครือข่าย/พรอกซี
- หน้าไม่โหลด/เกิด error: ตรวจสอบเทอร์มินัลที่รัน dev server และคอนโซลของเบราว์เซอร์

ช่องทางติดต่อ / สนับสนุน

เพิ่มช่องทางติดต่อของทีม (เช่น อีเมล, Slack) ที่นี่ถ้ามี



