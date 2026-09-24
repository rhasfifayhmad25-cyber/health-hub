# Health Hub V4

เวอร์ชันอัปเกรดสำหรับ GitHub Pages แบบ client-side

## เพิ่มใหม่
- Playlist 3 แทร็ก: เพลง Health Hub ที่ผู้ใช้ส่งมา + Focus Pulse + Night Calm
- ปุ่ม Previous / Play-Pause / Next
- เสียงต้อนรับจากวิดีโอที่ผู้ใช้ส่งมา (`welcome-voice.mp3`) พร้อมหน้าต่าง “ยินดีต้อนรับเข้าสู่ Health Hub”
- ค้นหาเกมแบบทันที และเพิ่มเกมรวม 24 เกม
- โปรไฟล์ผู้ใช้: ชื่อแสดง, emoji, เป้าหมายส่วนตัว, Level
- กราฟเวลาเล่นย้อนหลัง 7 วัน
- Health Score และ badge
- Dashboard สรุปสุขภาพ
- ระบบเดิม: Login, Admin, จับเวลา, เป้าหมาย, Sleep Tracker, AI Health Coach

## บัญชี Demo
- USER: student / 1234
- ADMIN: admin / HHadmin2026!

## หมายเหตุ
ข้อมูลและบัญชีในเวอร์ชันนี้เก็บด้วย localStorage จึงยังไม่ใช่ backend จริงหลายเครื่อง
หากต้องการระบบจริง ให้ต่อ Firebase Authentication + Firestore และกำหนด Security Rules
