-- CreateTable
CREATE TABLE "Candidate" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15),
    "address" VARCHAR(100),

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "institution" VARCHAR(100) NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "candidateId" INTEGER NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" SERIAL NOT NULL,
    "company" VARCHAR(100) NOT NULL,
    "position" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200),
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "candidateId" INTEGER NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" SERIAL NOT NULL,
    "filePath" VARCHAR(500) NOT NULL,
    "fileType" VARCHAR(50) NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL,
    "candidateId" INTEGER NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "interviewFlowId" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "location" VARCHAR(100) NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "responsibilities" TEXT NOT NULL,
    "salaryMin" DECIMAL(10,2) NOT NULL,
    "salaryMax" DECIMAL(10,2) NOT NULL,
    "employmentType" VARCHAR(50) NOT NULL,
    "benefits" TEXT NOT NULL,
    "companyDescription" TEXT NOT NULL,
    "applicationDeadline" TIMESTAMP(3) NOT NULL,
    "contactInfo" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewFlow" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "InterviewFlow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewStep" (
    "id" SERIAL NOT NULL,
    "interviewFlowId" INTEGER NOT NULL,
    "interviewTypeId" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 60,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "positionId" INTEGER NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentStep" INTEGER,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "interviewStepId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "result" VARCHAR(50),
    "score" INTEGER,
    "notes" TEXT,
    "feedback" TEXT,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");

-- CreateIndex
CREATE INDEX "Company_name_idx" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE INDEX "Employee_email_idx" ON "Employee"("email");

-- CreateIndex
CREATE INDEX "Employee_companyId_idx" ON "Employee"("companyId");

-- CreateIndex
CREATE INDEX "Position_companyId_idx" ON "Position"("companyId");

-- CreateIndex
CREATE INDEX "Position_title_idx" ON "Position"("title");

-- CreateIndex
CREATE INDEX "Position_location_idx" ON "Position"("location");

-- CreateIndex
CREATE INDEX "Position_status_idx" ON "Position"("status");

-- CreateIndex
CREATE INDEX "InterviewFlow_name_idx" ON "InterviewFlow"("name");

-- CreateIndex
CREATE INDEX "InterviewStep_interviewFlowId_idx" ON "InterviewStep"("interviewFlowId");

-- CreateIndex
CREATE INDEX "InterviewStep_interviewTypeId_idx" ON "InterviewStep"("interviewTypeId");

-- CreateIndex
CREATE INDEX "InterviewStep_orderIndex_idx" ON "InterviewStep"("orderIndex");

-- CreateIndex
CREATE INDEX "InterviewType_name_idx" ON "InterviewType"("name");

-- CreateIndex
CREATE INDEX "Application_positionId_idx" ON "Application"("positionId");

-- CreateIndex
CREATE INDEX "Application_candidateId_idx" ON "Application"("candidateId");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "Application_applicationDate_idx" ON "Application"("applicationDate");

-- CreateIndex
CREATE INDEX "Interview_applicationId_idx" ON "Interview"("applicationId");

-- CreateIndex
CREATE INDEX "Interview_interviewStepId_idx" ON "Interview"("interviewStepId");

-- CreateIndex
CREATE INDEX "Interview_employeeId_idx" ON "Interview"("employeeId");

-- CreateIndex
CREATE INDEX "Interview_scheduledDate_idx" ON "Interview"("scheduledDate");

-- CreateIndex
CREATE INDEX "Interview_status_idx" ON "Interview"("status");

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_interviewFlowId_fkey" FOREIGN KEY ("interviewFlowId") REFERENCES "InterviewFlow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewStep" ADD CONSTRAINT "InterviewStep_interviewFlowId_fkey" FOREIGN KEY ("interviewFlowId") REFERENCES "InterviewFlow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewStep" ADD CONSTRAINT "InterviewStep_interviewTypeId_fkey" FOREIGN KEY ("interviewTypeId") REFERENCES "InterviewType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_interviewStepId_fkey" FOREIGN KEY ("interviewStepId") REFERENCES "InterviewStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
