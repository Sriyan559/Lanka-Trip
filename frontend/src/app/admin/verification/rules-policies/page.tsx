import Link from "next/link";

import {
    FileCheck2,
    FileSearch,
    ShieldCheck,
    ShieldQuestion,
} from "lucide-react";

const MODULES = [
    {
        title:
            "Supplier Verification",
        description:
            "Supplier verification status and review workflow.",
        href:
            "/admin/verification-compliance/supplier-verification",
        icon: FileCheck2,
    },
    {
        title:
            "Brand Authorizations",
        description:
            "Brand authorization and approval management.",
        href:
            "/admin/verification-compliance/brand-authorizations",
        icon: ShieldCheck,
    },
    {
        title:
            "Authenticity",
        description:
            "Authenticity investigations and verification signals.",
        href:
            "/admin/verification-compliance/authenticity",
        icon: FileSearch,
    },
    {
        title:
            "Governance & Rules",
        description:
            "Compliance policies, rules and governance controls.",
        href:
            "/admin/verification-compliance/governance",
        icon: ShieldQuestion,
    },
];

export default function VerificationCompliancePage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-[1920px] px-4 py-6 sm:px-6 lg:px-8">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
                        Verification &
                        Compliance
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Operational command
                        center for verification,
                        authenticity, safety,
                        governance and
                        compliance.
                    </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {MODULES.map(
                        ({
                            title,
                            description,
                            href,
                            icon: Icon,
                        }) => (
                            <Link
                                key={href}
                                href={href}
                                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                                    <Icon className="h-5 w-5 text-slate-600" />
                                </div>

                                <h2 className="mt-4 text-sm font-semibold text-slate-900">
                                    {title}
                                </h2>

                                <p className="mt-2 text-xs leading-5 text-slate-500">
                                    {description}
                                </p>
                            </Link>
                        ),
                    )}
                </div>
            </div>
        </main>
    );
}