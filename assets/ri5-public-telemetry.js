(() => {
  "use strict";

  const DATA_PATH = "assets/ri5-public-telemetry.json";
  const $ = (id) => document.getElementById(id);
  const number = (value) => Number(value ?? 0).toLocaleString("ja-JP");

  function formatJst(value){
    if (value === null || value === undefined || String(value).trim() === "") return "NOT AVAILABLE";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "NOT AVAILABLE";
    return new Intl.DateTimeFormat("ja-JP",{
      year:"numeric",month:"2-digit",day:"2-digit",
      hour:"2-digit",minute:"2-digit",second:"2-digit",
      hour12:false,timeZone:"Asia/Tokyo"
    }).format(date).replaceAll("/","-");
  }

  function setOutcomeClass(value){
    const el = $("ri5LatestOutcome");
    if (!el) return;
    el.textContent = value || "—";
    const v = String(value || "").toUpperCase();
    el.style.color = v === "PASS" ? "var(--green)" : (v === "FAIL" || v === "FATAL") ? "#ff5964" : "";
  }

  function render(data){
    const summary = data.summary || {};
    const latest = data.latest_run || {};

    $("ri5UpdatedAt").textContent = formatJst(data.updated_at);
    $("ri5TotalRuns").textContent = number(summary.total_runs);
    $("ri5PassRuns").textContent = number(summary.pass);
    $("ri5FailRuns").textContent = number(summary.fail);
    $("ri5FatalRuns").textContent = number(summary.fatal);
    $("ri5ArtifactCount").textContent = number(summary.indexed_artifacts);

    $("ri5LatestRunNo").textContent = `Run #${latest.run_index ?? "—"}`;
    $("ri5LatestLifecycle").textContent = latest.lifecycle || "—";
    setOutcomeClass(latest.result);
    $("ri5LatestArtifactGate").textContent = latest.artifact_gate || "—";
    $("ri5LatestDuration").textContent = Number.isFinite(Number(latest.duration_sec))
      ? `${Number(latest.duration_sec).toFixed(1)}s` : "—";
    const finishedAt = formatJst(latest.finished_at);
    $("ri5LatestTimestamp").textContent = finishedAt === "NOT AVAILABLE" ? finishedAt : `${finishedAt} JST`;
    $("ri5LatestReason").textContent = latest.reason || "—";

    const publication = data.publication || {};
    const badge = $("ri5PublicationBadge");
    if (badge){
      badge.textContent = publication.label || "PUBLIC SNAPSHOT";
      badge.title = publication.status || "";
    }
  }

  async function load(){
    try{
      const response = await fetch(DATA_PATH,{cache:"no-store"});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      render(await response.json());
    }catch(error){
      const badge = $("ri5PublicationBadge");
      if (badge){
        badge.textContent = "DATA UNAVAILABLE";
        badge.title = String(error);
        badge.style.color = "var(--orange)";
        badge.style.borderColor = "rgba(255,180,90,.45)";
      }
    }
  }

  if (typeof module !== "undefined" && module.exports){
    module.exports = {formatJst};
  }
  if (typeof document !== "undefined"){
    if (document.readyState === "loading"){
      document.addEventListener("DOMContentLoaded", load, {once:true});
    }else{
      load();
    }
  }
})();
