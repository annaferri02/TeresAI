import { create } from "zustand" // Importa la funzione 'create' dalla libreria 'zustand'

type Transcription = {
  id: string // Identificatore univoco della trascrizione
  title: string // Titolo della trascrizione
  date: string // Data della trascrizione
  status: "Completed" | "Recording" | "Pending Approval" // Stato della trascrizione
  content: string // Contenuto della trascrizione
  patientSummary: { title: string; data: string }[] // Riepilogo del paziente
}

type TranscriptionsStore = { // Definisce il tipo dello store
  transcriptions: Transcription[] // Array di trascrizioni
  updateTranscription: (id: string, updates: Partial<Transcription>) => void // Funzione per aggiornare una trascrizione
}

export const useTranscriptionsStore = create<TranscriptionsStore>((set) => ({
  transcriptions: [ // Inizializza l'array di trascrizioni con alcuni dati di esempio
  //Patient 1
      { id: "1", title: "Patient Consultation - John Doe", hours: "12:00", date: "2025-02-21", status: "Completed", content: `
        Nurse: Good afternoon, everyone. Let's begin the rounds for the Elderly Ward. We'll start with bed 1.

        Nurse: Good morning, Mr. Doe. How are you feeling today?

        Patient: I feel a bit weak, but otherwise okay.

        Nurse: I understand. Let's check your vital signs and see how we can assist you today.

        Nurse: Do you need anything at the moment?

        Patient: I would appreciate a glass of water, please.

        Nurse: Of course, I'll bring it right away.
      `,
        patientSummary: [
          { title: "Eating Behaviour", data: "Difficulty swallowing, requires liquid diet", date: "2025-02-21", hours: "12:00"},
          { title: "Medicine Administration", data: "Refused medication, doctor informed", date: "2025-02-21", hours: "11:43" },
          { title: "Sleep", data: "Woke up multiple times due to anxiety", date: "2025-02-21", hours: "06:30" },
          { title: "Energy", data: "Feeling particularly fatigued today, under monitoring", date: "2025-02-21", hours: "10:15"},
          { title: "Pain Complaints", data: "Severe back pain reported, analgesic administered", date: "2025-02-21", hours: "09:20"},
          { title: "Stool", data: "Constipation reported, increased hydration", date: "2025-02-21", hours: "08:00" },
          { title: "Blood Pressure", data: "Higher than usual, doctor notified", date: "2025-02-21", hours: "10:30" },
        ],
  },
  //Patient 2
        { id: "2", title: "Nurse Rounds - Ward 3", date: "2025-02-20", status: "Recording",  content: `
      Nurse: Good afternoon, everyone. Let's begin the rounds for the Elderly Ward. We'll start with bed 1.

      [Approaching bed 1]

      Nurse: Good morning, Mrs. Johnson. How are you feeling today?

      Patient: I feel a bit better, thank you.
      
      Nurse: I'm glad to hear that. Let's check your vital signs...

      [Moving to bed 2]
      
      Nurse: Mr. Smith, are you comfortable? Do you need anything?
      
      Patient: I'm fine, but could I have some water?
      
      Nurse: Of course, I'll bring it right away.

      [Continuing the rounds...]

    `,
    patientSummary: [
     { title: "Eating Behaviour", data: "2 patients with special diet, others on regular diet" },
  { title: "Medicine Administration", data: "Medications administered according to prescription for each patient" },
  { title: "Sleep", data: "Generally peaceful night, 1 patient with insomnia" },
  { title: "Energy", data: "Patients are alert, some with varying mobility, from bedridden to ambulatory with aids" },
  { title: "Pain Complaints", data: "Pain assessment conducted for all patients" },
  { title: "Stool", data: "1 patient with catheter, 2 with adult diapers, others independent" },
  { title: "Blood Pressure", data: "Monitored and recorded for all patients" },
    ],
  },

//Patient 3
    { id: "3", title: "Team Meeting - Shift Handover", date: "2025-02-19", status: "Completed", content: `
      Head Nurse: Good evening, team. Let's go over our shift handover for the night shift.

      Day Nurse 1: In Ward 2, we have a new admission in bed 3. Mr. Brown, 67 years old, post-op from hip replacement surgery. He's stable but needs regular pain management checks.

      Night Nurse 1: Understood. I'll make sure to monitor his pain levels closely.

      Day Nurse 2: In the ICU, patient in room 4 has shown improvement in breathing. We've reduced oxygen support, but please keep a close eye on oxygen saturation levels.

      Head Nurse: Thank you. Any questions or concerns before we conclude?

      [Team discusses final points]

      Head Nurse: Alright, thank you everyone. Have a good shift.
    `,
    patientSummary: [
      { title: "Eating Behaviour", data: "No data recorded yet" },
      { title: "Medicine Administration", data: "No data recorded yet" },
      { title: "Sleep", data: "No data recorded yet" },
      { title: "Energy", data: "No data recorded yet" },
      { title: "Pain Complaints", data: "No data recorded yet" },
      { title: "Stool", data: "No data recorded yet" },
      { title: "Blood Pressure", data: "No data recorded yet" },
    ],
  }, 

//Patient 4
    { id: "4", title: "Patient Discharge - Jane Smith", date: "2025-02-18", status: "Pending Approval", content: `
      Doctor: Good morning, Mrs. Smith. I'm happy to say that you're ready to be discharged today.

      Patient: Oh, that's wonderful news! What should I know before I go home?

      Doctor: I'll go over your discharge instructions now. First, regarding your medication...

      [Doctor explains medication regimen]

      Doctor: It's important that you follow up with your primary care physician within a week. Do you have any questions about that?

      Patient: No, I think I understand. Should I continue with the exercises the physical therapist showed me?

      Doctor: Yes, absolutely. I'll include those in your written instructions as well.

      Nurse: I'll be providing you with a written copy of all these instructions and going over them with you again before you leave.

      Patient: Thank you both so much for your care.
    `,
    patientSummary: [
      { title: "Eating Behaviour", data: "No data recorded yet" },
      { title: "Medicine Administration", data: "Continue prescribed antibiotics for 5 more days" },
      { title: "Sleep", data: "No data recorded yet" },
      { title: "Energy", data: "No data recorded yet" },
      { title: "Pain Complaints", data: "No data recorded yet" },
      { title: "Stool", data: "No data recorded yet" },
      { title: "Blood Pressure", data: "No data recorded yet" },
    ],
  }, 

//Patient 5
    { id: "5", title: "Emergency Room Intake - Alex Johnson", date: "2025-02-17", status: "Completed", content: `
      Triage Nurse: Hello, can you tell me your name and what brings you to the ER today?

      Patient: My name is Alex Johnson. I've been having severe chest pain for the last hour.

      Nurse: Okay, Alex. I'm going to ask you some questions and then we'll get you seen right away. Can you describe the pain?

      Patient: It feels like a heavy pressure, right in the center of my chest. It's radiating to my left arm.

      Nurse: Are you experiencing any shortness of breath, nausea, or sweating?

      Patient: Yes, I'm a bit short of breath and feeling nauseous.

      Nurse: Alright, I'm going to get you into a room immediately and call for a doctor.

      [Nurse quickly escorts patient to an examination room]
    `,
    patientSummary: [
      { title: "Eating Behaviour", data: "No data recorded yet" },
      { title: "Medicine Administration", data: "No data recorded yet" },
      { title: "Sleep", data: "No data recorded yet" },
      { title: "Energy", data: "No data recorded yet" },
      { title: "Pain Complaints", data: "Severe chest pain, radiating to left arm" },
      { title: "Stool", data: "No data recorded yet" },
      { title: "Blood Pressure", data: "No data recorded yet" },

    ],
  }, 

//Patient 6
    { id: "6", title: "Post-Op Follow-up - Sarah Lee", date: "2025-02-16", status: "Pending Approval", content: `
      Doctor: Good afternoon, Sarah. How are you feeling after your appendectomy?

      Patient: Hi, Doctor. I'm feeling much better, but I still have some pain around the incision site.

      Doctor: That's normal at this stage. May I take a look at the incision?

      Patient: Of course.

      [Doctor examines the incision]

      Doctor: The incision is healing nicely. There's no sign of infection. Now, let's discuss your recovery plan and any concerns you might have.

      Patient: When can I return to work and normal activities?

      Doctor: Let's go over that now. Typically, for an appendectomy...

      [Doctor explains recovery timeline and restrictions]

      Patient: Thank you, that's very helpful. Should I continue with the pain medication?

      Doctor: Yes, but we'll adjust the dosage. Here's what I recommend...
    `,
    patientSummary: [
      { title: "Eating Behaviour", data: "No data recorded yet" },
      { title: "Medicine Administration", data: "Adjusted pain medication regimen" },
      { title: "Sleep", data: "No data recorded yet" },
      { title: "Energy", data: "No data recorded yet" },
      { title: "Pain Complaints", data: "Some pain around the incision site" },
      { title: "Stool", data: "No data recorded yet" },
      { title: "Blood Pressure", data: "No data recorded yet" },

    ],
  },

//Patient 7
    { id: "7", title: "Pediatric Checkup - Tommy Brown", date: "2025-02-15", status: "Completed", content: `
      Doctor: Hello Tommy! How are you feeling today?

      Tommy: I'm good!

      Doctor: That's great to hear. Mrs. Brown, any concerns you'd like to discuss today?

      Mother: Yes, Tommy has been complaining of ear pain, especially at night.

      Doctor: I see. Tommy, can you point to where it hurts?

      [Tommy points to his right ear]

      Doctor: Okay, let's take a look. I'm going to use this tool to check inside your ear, Tommy. It won't hurt, I promise.

      [Doctor performs ear examination]

      Doctor: There's some redness and fluid buildup in the right ear. It looks like Tommy has an ear infection. I'll prescribe some antibiotics and explain how to manage this at home.

      Mother: Thank you, Doctor. Is there anything else we should watch for?

      Doctor: Yes, let's go over the symptoms to monitor and when you should bring Tommy back in...
    `,
    patientSummary: [
      { title: "Eating Behaviour", data: "No data recorded yet" },
      { title: "Medicine Administration", data: "Prescribed antibiotics" },
      { title: "Sleep", data: "No data recorded yet" },
      { title: "Energy", data: "No data recorded yet" },
      { title: "Pain Complaints", data: "Ear pain, especially at night" },
      { title: "Stool", data: "No data recorded yet" },
      { title: "Blood Pressure", data: "No data recorded yet" },
    ],
  }, 

//Patient 8
    { id: "8", title: "Psychiatric Evaluation - Emily White", date: "2025-02-14", status: "Recording", content: `
      Psychiatrist: Hello, Emily. How are you feeling today?

      Emily: I'm... I'm not sure. I've been having a hard time lately.

      Psychiatrist: I'm here to listen and help. Can you tell me more about what you've been experiencing?

      Emily: I've been feeling really sad and hopeless. It's hard to get out of bed most days.

      Psychiatrist: I'm sorry to hear that. How long have you been feeling this way?

      Emily: It's been getting worse over the past few months. I used to enjoy my hobbies, but now I don't find pleasure in anything.

      Psychiatrist: Thank you for sharing that, Emily. Let's talk more about your symptoms and how they're affecting your daily life.

      [Conversation continues, discussing Emily's symptoms, personal history, and potential treatment options]
    `,
    patientSummary: [
      { title: "Eating Behaviour", data: "No data recorded yet" },
      { title: "Medicine Administration", data: "No data recorded yet" },
      { title: "Sleep", data: "Hard to get out of bed most days" },
      { title: "Energy", data: "No data recorded yet" },
      { title: "Pain Complaints", data: "Feeling really sad and hopeless" },
      { title: "Stool", data: "No data recorded yet" },
      { title: "Blood Pressure", data: "No data recorded yet" },
    ],
  }, 

//Patient 9
    { id: "9", title: "Orthopedic Consultation - Robert Green", date: "2025-02-13", status: "Pending Approval", content: `
      Doctor: Good morning, Mr. Green. What brings you to the orthopedic clinic today?

      Robert: I've been having persistent pain in my right knee, especially when I climb stairs or after sitting for a long time.

      Doctor: I see. How long has this been going on?

      Robert: It started about 6 months ago, but it's gotten worse in the last few weeks.

      Doctor: Alright, let's take a closer look. I'm going to examine your knee now.

      [Doctor performs physical examination]

      Doctor: Based on the examination and your symptoms, it appears you may have osteoarthritis in your right knee. I'd like to order an X-ray to confirm this diagnosis.

      Robert: Okay. What are the treatment options if it is osteoarthritis?

      Doctor: Treatment can include pain management, physical therapy, and in some cases, surgery. Let's discuss these options after we get the X-ray results...
          `,
    patientSummary: [
      { title: "Eating Behaviour", data: "No data recorded yet" },
      { title: "Medicine Administration", data: "No data recorded yet" },
      { title: "Sleep", data: "No data recorded yet" },
      { title: "Energy", data: "No data recorded yet" },
      { title: "Pain Complaints", data: "Persistent right knee pain, worse with stairs and after prolonged sitting" },
      { title: "Stool", data: "No data recorded yet" },
      { title: "Blood Pressure", data: "No data recorded yet" },
    ],
  }, 

//Patient 10
    { id: "10", title: "Prenatal Visit - Maria Rodriguez", date: "2025-02-12", status: "Completed", content: `
      Doctor: Good morning, Maria. How are you feeling today?

      Maria: Good morning, Doctor. I'm feeling pretty good, just a little tired.

      Doctor: That's normal during pregnancy. You're at 28 weeks now, correct?

      Maria: Yes, that's right.

      Doctor: Great. Let's start by checking your vitals and then we'll do an ultrasound to check on the baby's growth.

      [Doctor performs routine checks]

      Doctor: Your blood pressure and other vitals look good. Now, let's take a look at your baby.

      [Ultrasound examination begins]

      Doctor: Here's your baby. The size looks good for 28 weeks. The heart rate is strong and regular.

      Maria: That's wonderful! Is it still a girl?

      Doctor: Yes, it's still a girl. Everything looks healthy. Do you have any questions or concerns?

      Maria: I've been having some back pain. Is that normal?

      Doctor: Yes, back pain is common during pregnancy. Let's discuss some ways to manage that...
    `,
    patientSummary: [
      { title: "Eating Behaviour", data: "No data recorded yet" },
      { title: "Medicine Administration", data: "Continue prenatal vitamins" },
      { title: "Sleep", data: "No data recorded yet" },
      { title: "Energy", data: "Feeling a little tired" },
      { title: "Pain Complaints", data: "Some back pain" },
      { title: "Stool", data: "No data recorded yet" },
      { title: "Blood Pressure", data: "Normal" },

    ],
  }, 
  
  
  ],
  updateTranscription: (id, updates) => // Definisce la funzione per aggiornare una trascrizione
    set((state) => ({ // Usa la funzione 'set' per aggiornare lo stato
      transcriptions: state.transcriptions.map((t) => (t.id === id ? { ...t, ...updates } : t)), // Aggiorna la trascrizione con l'id corrispondente
    })),
}))

