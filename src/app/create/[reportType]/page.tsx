"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import WizardLayout from "@/components/wizard/WizardLayout";
import WizardNavigation from "@/components/wizard/WizardNavigation";
import { useWizardStore } from "@/stores/wizard-store";
import { getReportTypeConfig, ReportType } from "@/config/report-types";
import StepOrganization from "@/components/wizard/steps/StepOrganization";
import StepActivity from "@/components/wizard/steps/StepActivity";
import StepObjectives from "@/components/wizard/steps/StepObjectives";
import StepMedia from "@/components/wizard/steps/StepMedia";

export default function CreateReportPage() {
          const params = useParams();
          const router = useRouter();
          const reportTypeId = params.reportType as ReportType;

          const { currentStep, setReportType, reportType } = useWizardStore();

          // Get config for this report type
          const config = getReportTypeConfig(reportTypeId);

          // Validate report type exists and is enabled
          useEffect(() => {
                    if (!config || !config.enabled) {
                              router.push('/select');
                              return;
                    }

                    // Set report type in store if different
                    if (reportType !== reportTypeId) {
                              setReportType(reportTypeId);
                    }
          }, [config, reportTypeId, reportType, setReportType, router]);

          if (!config || !config.enabled) {
                    return null;
          }

          // Render current step component (4 steps now)
          const renderStep = () => {
                    switch (currentStep) {
                              case 1:
                                        return <StepOrganization />;
                              case 2:
                                        return <StepActivity />;
                              case 3:
                                        return <StepObjectives />;
                              case 4:
                                        return <StepMedia />;
                              default:
                                        return <StepOrganization />;
                    }
          };

          return (
                    <WizardLayout reportTypeTitle={config.title}>
                              {renderStep()}
                              <WizardNavigation showPreview={currentStep === 4} />
                    </WizardLayout>
          );
}
