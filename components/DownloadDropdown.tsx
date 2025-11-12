"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, Table } from "lucide-react";
import { getAllJobsForDownloadAction } from "@/utils/actions";
import { JobType } from "@/utils/types";
import dayjs from "dayjs";
import * as XLSX from "xlsx";

function DownloadDropdown() {
  const handleDownloadCSV = async () => {
    try {
      const jobs = await getAllJobsForDownloadAction();
      downloadAsCSV(jobs);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const jobs = await getAllJobsForDownloadAction();
      downloadAsExcel(jobs);
    } catch (error) {
      console.error("Error downloading Excel:", error);
    }
  };

  const downloadAsCSV = (jobs: JobType[]) => {
    // Calculate stats
    const totalApplied = jobs.length;
    const declined = jobs.filter((j) => j.status === "declined").length;
    const interview = jobs.filter((j) => j.status === "interview").length;
    const pending = jobs.filter((j) => j.status === "pending").length;

    const generatedAt = dayjs().format("DD-MMM-YYYY HH:mm");
    const headingText = `Total Applied: ${totalApplied}, Declined: ${declined}, Interview: ${interview}, Pending: ${pending}      Report Generated: ${generatedAt}`;

    // Sort newest first
    const sorted = [...jobs].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Create CSV content
    // Title, stats line, then blank line
    let csvContent = `Job Application History\n"${headingText}"\n\n`;

    // Table header with serial No. and formatted date
    csvContent +=
      "No.,Applied Date,Job Title,Company Name,Job Location,Role,Status\n";

    let serial = 1;
    let lastMonthKey = "";
    sorted.forEach((job) => {
      const appliedDate = dayjs(job.createdAt).format("DD-MMM-YYYY");
      const monthKey = dayjs(job.createdAt).format("YYYY-MM");
      const jobTitle = `"${job.position}"`;
      const company = `"${job.company}"`;
      const location = `"${job.location}"`;
      const role =
        job.mode === "full-time"
          ? "Full Time"
          : job.mode === "part-time"
          ? "Part Time"
          : "Internship";
      const status = job.status.charAt(0).toUpperCase() + job.status.slice(1);

      // Row gap between months
      if (lastMonthKey && monthKey !== lastMonthKey) {
        csvContent += "\n";
      }
      lastMonthKey = monthKey;

      csvContent += `${serial},${appliedDate},${jobTitle},${company},${location},${role},${status}\n`;
      serial += 1;
    });

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `job-applications-${dayjs().format("YYYY-MM")}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAsExcel = (jobs: JobType[]) => {
    // Calculate stats
    const totalApplied = jobs.length;
    const declined = jobs.filter((j) => j.status === "declined").length;
    const interview = jobs.filter((j) => j.status === "interview").length;
    const pending = jobs.filter((j) => j.status === "pending").length;

    const generatedAt = dayjs().format("DD-MMM-YYYY HH:mm");
    const headingText = `Total Applied: ${totalApplied}, Declined: ${declined}, Interview: ${interview}, Pending: ${pending}      Report Generated: ${generatedAt}`;

    // Sort newest first
    const sorted = [...jobs].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const rows: Array<Array<string | number>> = [];
    rows.push(["Job Application History"]);
    rows.push([headingText]);
    rows.push([]);
    rows.push([
      "No.",
      "Applied Date",
      "Job Title",
      "Company Name",
      "Job Location",
      "Role",
      "Status",
    ]);

    let serial = 1;
    let lastMonthKey = "";
    sorted.forEach((job) => {
      const appliedDate = dayjs(job.createdAt).format("DD-MMM-YYYY");
      const monthKey = dayjs(job.createdAt).format("YYYY-MM");
      const role =
        job.mode === "full-time"
          ? "Full Time"
          : job.mode === "part-time"
          ? "Part Time"
          : "Internship";
      const status = job.status.charAt(0).toUpperCase() + job.status.slice(1);

      if (lastMonthKey && monthKey !== lastMonthKey) {
        rows.push([]);
      }
      lastMonthKey = monthKey;

      rows.push([
        serial,
        appliedDate,
        job.position,
        job.company,
        job.location,
        role,
        status,
      ]);
      serial += 1;
    });

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    (worksheet as any)["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Job Applications");
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `job-applications-${dayjs().format("YYYY-MM")}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const groupJobsByMonth = (jobs: JobType[]) => {
    return jobs.reduce((acc, job) => {
      const month = dayjs(job.createdAt).format("MMM YYYY");
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(job);
      return acc;
    }, {} as Record<string, JobType[]>);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={handleDownloadCSV}
          className="flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          Download as CSV
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDownloadExcel}
          className="flex items-center gap-2"
        >
          <Table className="h-4 w-4" />
          Download as Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DownloadDropdown;
