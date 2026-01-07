import { CodeBlock } from "@/components/docs/code-block"
import { Avatar, decorativeColors } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"

const sizes = [
  { value: "3xs", label: "3XS", size: 20 },
  { value: "2xs", label: "2XS", size: 24 },
  { value: "xs", label: "XS", size: 28 },
  { value: "s", label: "S", size: 32 },
  { value: "m", label: "M", size: 36 },
  { value: "l", label: "L", size: 40 },
] as const

const singleAvatar = { src: "/avatars/avatar-8.png", alt: "User" }

const sampleAvatars = [
  { src: "/avatars/avatar-1.png", alt: "User 1" },
  { src: "/avatars/avatar-2.png", alt: "User 2" },
  { src: "/avatars/avatar-3.png", alt: "User 3" },
  { src: "/avatars/avatar-4.png", alt: "User 4" },
  { src: "/avatars/avatar-5.png", alt: "User 5" },
  { src: "/avatars/avatar-6.png", alt: "User 6" },
  { src: "/avatars/avatar-7.png", alt: "User 7" },
  { src: "/avatars/avatar-8.png", alt: "User 8" },
]

export default function AvatarDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Avatar</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Visual representation of a user with image, initials, or icon
            fallback
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Avatar } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"

<Avatar src="/avatar.jpg" alt="User" />
<Avatar initials="SA" fallback="initials" />
<Avatar /> {/* Shows icon fallback */}

{/* Colored emphasized avatars */}
<Avatar initials="JD" color="blue" isEmphasized />
<Avatar color="rose" isEmphasized />

<AvatarGroup max={3}>
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
  <Avatar src="/user4.jpg" />
</AvatarGroup>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Types</h2>
          <p className="text-body-s text-content-subtle">
            Avatar supports image, initials, and icon fallback types.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Image</p>
              <p className="text-body-s text-content-subtle">
                User photo or profile picture
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-12)]">
              <Avatar
                size="m"
                shape="circular"
                src={singleAvatar.src}
                alt={singleAvatar.alt}
              />
              <Avatar
                size="m"
                shape="square"
                src={singleAvatar.src}
                alt={singleAvatar.alt}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Initials</p>
              <p className="text-body-s text-content-subtle">
                Two-letter initials fallback
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-12)]">
              <Avatar size="m" shape="circular" initials="SA" fallback="initials" />
              <Avatar size="m" shape="square" initials="SA" fallback="initials" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon</p>
              <p className="text-body-s text-content-subtle">
                Generic user icon fallback
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-12)]">
              <Avatar size="m" shape="circular" />
              <Avatar size="m" shape="square" />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Sizes</h2>
          <p className="text-body-s text-content-subtle">
            Five sizes available from 2XS to L.
          </p>
        </div>
        <div className="flex flex-col">
          {sizes.map((size) => (
            <div
              key={size.value}
              className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-body-m text-content-strong">{size.label}</p>
                <p className="text-body-s text-content-subtle">
                  {size.size}px
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-12)]">
                <Avatar
                  size={size.value}
                  shape="circular"
                  src={singleAvatar.src}
                  alt={singleAvatar.alt}
                />
                <Avatar
                  size={size.value}
                  shape="circular"
                  initials="SA"
                  fallback="initials"
                />
                <Avatar size={size.value} shape="circular" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Shapes</h2>
          <p className="text-body-s text-content-subtle">
            Circular or square shape options.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Circular</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              {sizes.map((size) => (
                <Avatar
                  key={size.value}
                  size={size.value}
                  shape="circular"
                  src={singleAvatar.src}
                  alt={singleAvatar.alt}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Square</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              {sizes.map((size) => (
                <Avatar
                  key={size.value}
                  size={size.value}
                  shape="square"
                  src={singleAvatar.src}
                  alt={singleAvatar.alt}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Colors</h2>
          <p className="text-body-s text-content-subtle">
            Avatars can be emphasized with colors.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Initials</p>
              <p className="text-body-s text-content-subtle">
                Colored initials fallback
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              {decorativeColors.map((color) => (
                <Avatar
                  key={color}
                  size="m"
                  shape="circular"
                  initials={color.slice(0, 2).toUpperCase()}
                  fallback="initials"
                  color={color}
                  isEmphasized
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon</p>
              <p className="text-body-s text-content-subtle">
                Colored icon fallback
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              {decorativeColors.map((color) => (
                <Avatar
                  key={color}
                  size="m"
                  shape="circular"
                  color={color}
                  isEmphasized
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Avatar Group</h2>
          <p className="text-body-s text-content-subtle">
            Stack multiple avatars with automatic overflow count.
          </p>
        </div>
        <div className="flex flex-col">
          {sizes.map((size) => (
            <div
              key={size.value}
              className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-body-m text-content-strong">{size.label}</p>
                <p className="text-body-s text-content-subtle">{size.size}px</p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-16)]">
                <AvatarGroup size={size.value} shape="circular" max={4}>
                  {sampleAvatars.map((avatar, i) => (
                    <Avatar key={i} src={avatar.src} alt={avatar.alt} />
                  ))}
                </AvatarGroup>
                <AvatarGroup size={size.value} shape="square" max={4}>
                  {sampleAvatars.map((avatar, i) => (
                    <Avatar key={i} src={avatar.src} alt={avatar.alt} />
                  ))}
                </AvatarGroup>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
