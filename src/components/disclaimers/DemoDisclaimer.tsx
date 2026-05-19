import { ShieldCheck } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";

export function DemoDisclaimer() {
  const { t } = useI18n();
  return (
    <div className="s11-disclaimer">
      <ShieldCheck size={14} />
      <span>{t("disclaimer.default")}</span>
    </div>
  );
}
