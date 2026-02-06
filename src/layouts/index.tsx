import { BrandPopoverPanel, UserPopoverPanel } from "@/components/PopoverPanel"
import { ThemeButton } from "@/components/ThemeButton"
import { AntdLayout } from "@adminui-dev/antd-layout"
import type { LayoutConfig, LocaleMessage } from "@adminui-dev/antd-layout"
import menuData from "./menuData"
import WardenLogo from "@/components/WardenLogo"
import antdZhCN from 'antd/locale/zh_CN'
import antdEnUS from 'antd/locale/en_US'
import zhCN from "@/locales/zh-CN"
import enUS from "@/locales/en-US"
import { LanguageButton } from "@/components/LanguageButton"
import wardenSkins from "@/components/warden-skins"

const localeMessages:Record<string,LocaleMessage> = {   
    "zh-CN":{
        locale:antdZhCN.locale,
        name:"简体中文",
        flag:"🇨🇳",
        messages:zhCN,            
        antdLocale:antdZhCN
    },
    "en-US":{
        locale:antdEnUS.locale,
        name:"English",
        flag:"🇺🇸",
        messages:enUS,
        antdLocale:antdEnUS
    },
}
/**
 * =========
 *  layout
 * =========
 * The most essential component
 * 
 * @returns 
 */
export default function(){      
    // layout config
    const layoutConfig:LayoutConfig = {
        layoutType:"leftMenu",  
        asideMenuInline:true,
        hideAsideMenuDataEmpty:true,
        skinName:"parkWavesLight",
        collapsedPosition:"center",       
        menuIconSize:16,
        disabledLocale:false,
        largeBrand:true,
        brandInfo:{
            logo:<WardenLogo />,
            name:"Warden.vip",
            title:"Web build frameworks"
        },
        userInfo:{
            uid:"Scapegoat",
            title:"zhouwenqi@me.com",
            avatar:"https://api.dicebear.com/9.x/miniavs/svg?seed=8"
        }
    }

    return(
        <>
            <AntdLayout layoutConfig={layoutConfig} menuData={menuData} themeSkins={wardenSkins} localeMessages={localeMessages}>
                <AntdLayout.BrandPopoverContent>
                    <BrandPopoverPanel />
                </AntdLayout.BrandPopoverContent>
                <AntdLayout.AvatarPopoverContent>
                    <UserPopoverPanel />
                </AntdLayout.AvatarPopoverContent>
                <AntdLayout.HeaderToolbarExtra>
                    <LanguageButton />
                    <ThemeButton />
                </AntdLayout.HeaderToolbarExtra>
            </AntdLayout>
        </>
    )
}