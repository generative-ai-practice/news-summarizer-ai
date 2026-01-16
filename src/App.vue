<template>
  <div class="min-h-screen">
    <header
      class="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-8 pt-16"
    >
      <div class="flex flex-col gap-3">
        <p
          class="text-xs font-semibold uppercase tracking-[0.35em] text-ink/60"
        >
          News Summarizer AI
        </p>
        <h1 class="font-display text-4xl leading-tight text-ink sm:text-5xl">
          Provider timeline for summaries, deprecations, and changelog updates.
        </h1>
        <p class="max-w-2xl text-base text-ink/70">
          Auto-collected reports across providers, organized as a single stream.
          Use this page to scan what changed, then open the source link for
          details.
        </p>
      </div>
      <div
        class="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em]"
      >
        <span
          class="rounded-full border border-ink/10 bg-white/70 px-3 py-1 text-ink/70"
        >
          Entries: {{ filteredItems.length }}
        </span>
        <span
          class="rounded-full border border-ink/10 bg-white/70 px-3 py-1 text-ink/70"
        >
          Providers: {{ providerCount }}
        </span>
        <span
          class="rounded-full border border-ink/10 bg-white/70 px-3 py-1 text-ink/70"
        >
          Last updated: {{ lastUpdatedLabel }}
        </span>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl px-6 pb-20">
      <section
        class="rounded-3xl border border-ink/10 bg-white/80 p-6 shadow-glow backdrop-blur"
      >
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 class="font-display text-2xl text-ink">Timeline</h2>
            <p class="text-sm text-ink/60">
              Sorted by published date with source and provider tags.
            </p>
          </div>
          <div
            class="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em]"
          >
            <button
              v-for="option in providerOptions"
              :key="option"
              type="button"
              class="rounded-full border border-ink/10 px-3 py-2 transition hover:border-ink/30"
              :class="
                option === activeProvider
                  ? 'bg-ink text-white'
                  : 'bg-white/70 text-ink/70'
              "
              @click="activeProvider = option"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <div v-if="loading" class="py-12 text-center text-sm text-ink/60">
          Loading timeline data...
        </div>
        <div
          v-else-if="filteredItems.length === 0"
          class="py-12 text-center text-sm text-ink/60"
        >
          No entries yet. Run the data builder to populate the feed.
        </div>

        <ol v-else class="mt-8 space-y-6">
          <li
            v-for="item in filteredItems"
            :key="item.id"
            class="group rounded-2xl border border-ink/10 bg-white/90 p-5 transition hover:-translate-y-1 hover:border-ink/30 hover:shadow-lg"
          >
            <div
              class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink/60"
            >
              <span class="rounded-full bg-ink/5 px-3 py-1">{{
                item.provider
              }}</span>
              <span class="rounded-full bg-ink/5 px-3 py-1">{{
                item.category
              }}</span>
              <span class="rounded-full bg-ink/5 px-3 py-1">{{
                item.published
              }}</span>
            </div>
            <div class="mt-4 flex flex-col gap-3">
              <h3 class="font-display text-xl text-ink">{{ item.title }}</h3>
              <ul
                v-if="item.summaryLines && item.summaryLines.length"
                class="space-y-2 text-sm text-ink/70"
              >
                <li
                  v-for="(line, idx) in item.summaryLines"
                  :key="`${item.id}-${idx}`"
                  :class="
                    isTableLine(line)
                      ? 'rounded-2xl border border-ink/10 bg-white/80 p-3'
                      : 'flex gap-2'
                  "
                >
                  <span
                    v-if="!isTableLine(line)"
                    class="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-ink/40"
                  ></span>
                  <span v-if="!isTableLine(line)" v-html="formatLine(line)"></span>
                  <div v-else v-html="tableHtml(line)"></div>
                </li>
              </ul>
              <p v-else class="text-sm text-ink/70">{{ item.summary }}</p>
              <div
                class="flex flex-wrap items-center justify-between gap-3 text-sm"
              >
                <span class="text-ink/50">{{ item.sourceMedium }}</span>
                <a
                  class="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition hover:border-ink hover:bg-ink hover:text-white"
                  :href="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Source
                </a>
              </div>
            </div>
          </li>
        </ol>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

type TimelineItem = {
  id: string;
  title: string;
  published: string;
  url: string;
  provider: string;
  category: string;
  source: string;
  sourceMedium: string;
  summary: string;
  summaryLines: string[];
};

const loading = ref(true);
const items = ref<TimelineItem[]>([]);
const activeProvider = ref("All");

const providerOptions = computed(() => {
  const providers = new Set(items.value.map((item) => item.provider));
  return ["All", ...Array.from(providers).sort()];
});

const providerCount = computed(
  () => new Set(items.value.map((item) => item.provider)).size,
);

const lastUpdatedLabel = computed(() => {
  if (!items.value.length) return "n/a";
  return items.value[0].published;
});

const filteredItems = computed(() => {
  if (activeProvider.value === "All") return items.value;
  return items.value.filter((item) => item.provider === activeProvider.value);
});

const loadTimeline = async () => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data.json`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Failed to load data.json");
    const payload = (await response.json()) as { items: TimelineItem[] };
    items.value = payload.items ?? [];
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatLine = (line: string) => {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let out = "";

  while ((match = regex.exec(line)) !== null) {
    const [full, text, url] = match;
    out += escapeHtml(line.slice(lastIndex, match.index));
    const safeText = escapeHtml(text);
    const safeUrl = escapeHtml(url);
    out += `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="text-tide underline decoration-tide/70 underline-offset-2 hover:text-ink">${safeText}</a>`;
    lastIndex = match.index + full.length;
  }

  out += escapeHtml(line.slice(lastIndex));
  return out;
};

const isTableLine = (line: string) => line.startsWith("__TABLE__");

const tableHtml = (line: string) => line.replace("__TABLE__", "");

onMounted(loadTimeline);
</script>
