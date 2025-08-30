import { getDictionary, Locale } from "@/dictionaries";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const policy = dict.privacy_policy;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 text-center">
            {policy.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
            {policy.last_updated}
          </p>

          <p className="mb-6 text-lg leading-relaxed">{policy.introduction}</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {policy.data_we_collect.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-4">
                {policy.data_we_collect.items.map(
                  (item: string, index: number) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  )
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {policy.how_we_use_data.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-4">
                {policy.how_we_use_data.items.map(
                  (item: string, index: number) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  )
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {policy.data_sharing.title}
              </h2>
              <p className="leading-relaxed">{policy.data_sharing.content}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {policy.your_rights.title}
              </h2>
              <p className="leading-relaxed">{policy.your_rights.content}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {policy.contact.title}
              </h2>
              <p
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: policy.contact.content }}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
