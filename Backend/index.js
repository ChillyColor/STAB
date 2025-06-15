import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import pg from "pg";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const saltRounds = 10;

const app = express();
const JWT_SECRET = "kjahd2031";

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "STAB",
  password: "123",
  port: 5432,
});

db.connect();

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const loginPassword = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      bcrypt.compare(loginPassword, storedPassword, (err, isMatch) => {
        if (err) {
          console.error("Error occurred while comparing password:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (isMatch) {
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
              role: user.role,
              name: user.name,
            },
            JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
          });
          return res
            .status(200)
            .json({ message: "Login successful", role: user.role });
        } else {
          return res.status(401).json({ message: "Incorrect password" });
        }
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  const { email, password, role, name } = req.body;

  try {
    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "User already registered" });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error("Error occurred while hashing:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      try {
        await db.query(
          "INSERT INTO users (email, password, role,name) VALUES ($1, $2, $3,$4)",
          [email, hash, role, name]
        );
        return res.status(201).json({ message: "Registration successful" });
      } catch (dbError) {
        console.error("Database error during insert:", dbError);
        return res.status(500).json({ message: "Database error" });
      }
    });
  } catch (dbError) {
    console.error("Database error during email check:", dbError);
    return res.status(500).json({ message: "Database error" });
  }
});
app.post("/api/bookings", async (req, res) => {
  const { teacher_id, student_id, message, appointment_time } = req.body;
  try {
    await db.query(
      "INSERT INTO appointments (student_id,teacher_id,appointment_time,message) VALUES ($1,$2,$3,$4)",
      [student_id, teacher_id, appointment_time, message]
    );
    return res.status(201).json({ message: "Booking Req Sent Successfully" });
  } catch (err) {
    console.log(`Database Error ${err}`);
    return res.status(500).json({ message: "Database Error" });
  }
});
app.get("/validate-session", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({
      role: decoded.role,
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});
app.get("/api/getTeacherData", async (req, res) => {
  const currentUser = req.headers["teacher_id"];

  try {
    const pending = await db.query(
      "SELECT COUNT(*) FROM appointments WHERE teacher_id=$1 AND status=$2 ",
      [currentUser, "pending"]
    );
    const pendingCount = pending.rows[0].count;
    const accepted = await db.query(
      "SELECT COUNT(*) FROM appointments WHERE teacher_id=$1 AND status=$2 ",
      [currentUser, "approved"]
    );
    const approvedCount = accepted.rows[0].count;
    const today = await db.query(
      "SELECT COUNT(*) FROM appointments WHERE teacher_id = $1 AND DATE(appointment_time) = CURRENT_DATE and status=$2",
      [currentUser, "approved"]
    );
    const todaySession = today.rows[0].count;
    const appointData= await db.query(
      "SELECT * FROM appointments  WHERE teacher_id=$1 AND status=$2 ORDER BY appointment_time ASC LIMIT 3",
      [currentUser, "approved"]
    );
    res.status(200).json({
      pending: parseInt(pendingCount, 10),
      accepted: parseInt(approvedCount, 10),
      current: parseInt(todaySession, 10),
      appointments: appointData.rows,
    });
  } catch (err) {
    console.error("Database Failure: ", err);
  }
});
app.get("/api/getbooking", async (req, res) => {
  const currentUser = req.headers["teacher_id"];

  try {
    const result = await db.query(
      `SELECT u.id, u.name, u.email, a.appointment_time,a.message
       FROM appointments a
       JOIN users u ON a.student_id = u.id
       WHERE a.teacher_id = $1 AND a.status='pending'`,
      [currentUser]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/getSessions", async (req, res) => {
  const currentUser = req.headers["teacher_id"];
  try {
    const result = await db.query(
      `SELECT u.id, u.name, u.email, a.appointment_time,a.message
       FROM appointments a
       JOIN users u ON a.student_id = u.id
       WHERE a.teacher_id = $1 AND a.status='approved'`,
      [currentUser]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
);

app.get("/api/teacher", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id,name,email FROM users WHERE role='Teacher'"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.log("Database Error:", err);
    res.send(500).json({ message: "Server Error" });
  }
});
app.put("/api/updateStatus",async(req,res)=>{
  const {sid,tid,status}=req.body
  try{
    await db.query("UPDATE appointments SET status=$1 WHERE teacher_id=$2 AND student_id=$3",[status,tid,sid]);
    res.status(200).json({message:"Status Updated"})
  }catch(err){
    console.error("Database Error:",err);
    res.send(500)
  }
})
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
